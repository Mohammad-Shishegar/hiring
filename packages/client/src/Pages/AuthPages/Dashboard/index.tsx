import About from "src/components/feature/dashboard/About"
import Features from "src/components/feature/dashboard/Feature"
import Hero from "src/components/feature/dashboard/Hero"
import JobExplore from "src/components/feature/dashboard/JobExplore"

const Dashboard = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <JobExplore/>
        </>
    )
}

export default Dashboard