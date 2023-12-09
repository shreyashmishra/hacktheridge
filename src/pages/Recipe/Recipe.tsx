import { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import { IconMap, IconChefHat, IconShoppingCart } from "@tabler/icons-react";

const Recipe = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const apiKey = 'yDzpILsEy5GjXQvYYdSnKJVMd42QqIZsLbVNIPnO';
    const { cart } = useAppContext()
    const [isGeneratingThroughInput, setIsGeneratingThroughInput] = useState(false)

    function generateRecipeFromCart() {
        setOutput("Loading...")
        fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            body: JSON.stringify({
                prompt: `Give me a delicious recipe using the following ingredients: ${cart.map(x => x.name).join(', ')}.`,
                max_tokens: 400,
            }),
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const recipe = json.generations[0].text;
            setOutput(`${recipe}\n\nApproximate Calories: 400-600`)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function generateRecipeThroughInput(input: string) {
        setOutput("Loading...")
        fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            body: JSON.stringify({
                prompt: `Give me a delicious recipe using ${input}.`,
                max_tokens: 400,
            }),
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const recipe = json.generations[0].text;
            setOutput(`${recipe}\n\nApproximate Calories: 400-600`)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="page">
            <h1 className="text-2xl font-medium mb-4">Recipe Generator</h1>
            <div className="flex flex-col p-12 gap-4 justify-center">
                <button className="block bg-green-600 hover:bg-green-500 transition py-2 px-4 rounded-md text-xl text-gray-50"
                onClick={generateRecipeFromCart}>Generate Recipe from Cart</button>
                
                {isGeneratingThroughInput === true ? <>
                    <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} placeholder="Enter ingredients" className="p-4 rounded-md" />
                    <button className="block bg-blue-600 hover:bg-blue-500 transition py-2 px-4 rounded-md text-xl text-gray-50" onClick={() => generateRecipeThroughInput(input)}>Generate Recipe</button>
                </> : <>
                    <button
                        className="block bg-blue-600 hover:bg-blue-500 transition py-2 px-4 rounded-md text-xl text-gray-50"
                        onClick={() => setIsGeneratingThroughInput(true)}
                    >Generate Recipe from Input</button>
                </>}
                <p>{output}</p>
            </div>
        </div>
    )
}

export default Recipe;
