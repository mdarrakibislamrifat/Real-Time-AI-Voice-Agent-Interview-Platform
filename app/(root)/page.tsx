import InterviewCard from "@/components/InterviewCard"
import { Button } from "@/components/ui/button"

import { getCurrentUser } from "@/lib/actions/auth.action"

import { getInterviewsByUserId, getLatestIntervies } from "@/lib/actions/general.action"

import Image from "next/image"
import Link from "next/link"
import { promise } from "zod"

const Page = async () => {

  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestIntervies({ userId: user?.id! })
  ])

  const hasPastInterviews = userInterviews?.length > 0;

  const hasUpCommingInterviews = latestInterviews?.length > 0

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-powered Practice & Feedback</h2>
          <p className="text-lg"> Practice on real interview questions & get instant Feedback</p>
          <Button asChild className="btn-primary max-sm:w-full">

            <Link href="/interview">Start an Interview</Link>

          </Button>
        </div>

        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />

      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {
            hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))
            ) : (
              <p>You haven&apos;t taken any interviews yet</p>
            )
          }
        </div>


      </section>


      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {
            hasUpCommingInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))
            ) : (
              <p>There are no new interviews available</p>
            )
          }
        </div>
      </section>


    </>
  )
}

export default Page;