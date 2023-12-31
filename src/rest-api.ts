import {Client, ThreadChannel} from "discord.js"
import express from "express"

export function createRestApi(client:Client){
  const app = express()
  app.use(express.json())

  app.get("/", (req, res) => res.send("Deployed! 🚀"));

  app.get("/message", async(req,res)=>{
    const {threadId} = req.query
    if(!threadId){return res.status(400).send("Missing threadId")}

    const thread = await client.channels.fetch(threadId as string) as ThreadChannel;
    if(!thread){return res.status(400).send("Thread with this id was not found")}

    console.log("#####messages######");
    console.log(thread.messages.fetch().then((res)=>console.log(res)))
    console.log("################");
    const message = await thread.messages.fetch()
    //console.log(message)
    return res.status(200).send(JSON.stringify(message||[]))
  })


  app.post("/message",async(req, res)=>{
    const { threadId, text } = req.body;
    if (!threadId) {
      return res.status(400).send("Missing threadId");
    }
    if (!text) {
      return res.status(400).send("Missing text");
    }

    const thread = (await client.channels.fetch(
      threadId as string
    )) as ThreadChannel;
    if (!thread) {
      return res.status(400).send("Thread with this id was not found");
    }

    await thread.send(text)
    return res.status(200).send("Message sent")
  })

  app.post("/resolve", async (req, res) => {
    const { threadId } = req.body;
    if (!threadId) {
      return res.status(400).send("Missing threadId");
    }

    const thread = (await client.channels.fetch(
      threadId as string
    )) as ThreadChannel;
    if (!thread) {
      return res.status(400).send("Thread with this id was not found");
    }

    await thread.send("This conversation is marked as resolved and this thread will be archieved");
    await thread.setArchived(true)
    return res.status(200).send("Thread resolved");
  });

  return app;
}