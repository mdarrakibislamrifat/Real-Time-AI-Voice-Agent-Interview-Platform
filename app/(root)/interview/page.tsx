import Agent from "@/components/agent"


const page = () => {
    return (
        <>
            <h3>Interview Genration</h3>
            <Agent userName="You" userId="user1" type="generate" />
        </>
    )
}

export default page