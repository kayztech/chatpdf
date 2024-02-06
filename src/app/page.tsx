import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { UserButton,auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";


export default async function Home() {

  const {userId} = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }


  return (
    <div className ="p-10 w-screen min-h-screen  bg-gradient-to-r from-rose-100 to-teal-100">
      <div className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className = "text-blue-800">Hello World</h1>
        <div className="flex flex-col items-center text-center">
          <div className = "flex items-center">
            <h1 className = "mr-3 text-5xl font-semibold"> Chat with any PDF </h1>
              <Button> Click Me</Button>
              <UserButton afterSignOutUrl="/"/>
          </div>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>
          
          <p className = "max-w-xl mt-1 text-lg">
            Join Millions of student, researchers and professionals to instantly answer questions and understand research with AI.
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              <div>
                 <h1>fileupload area</h1>
                <Button>Hello
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <FileUpload />
              </div>
              //<FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>


      
   
    </div>
  );
}
