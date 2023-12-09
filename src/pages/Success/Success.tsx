import { IconCheck } from "@tabler/icons-react";

const Success = () => {
    return <div className="page flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-green-700 flex justify-center items-center">
                <IconCheck color="white" size={32} />
            </div>
            <h1 className="text-[4rem] font-bold">Success!</h1>
        </div>
        <p>Thanks for purchasing!</p>
    </div>
}

export default Success;