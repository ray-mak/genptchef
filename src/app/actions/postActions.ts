"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

type PostProps = {
  id: string
  name: string
  createdAt: Date
  title: string
  imageUrl: string
  ingredients: string[]
  instructions: string[]
  cookTime: string
  username: string
}

type AddPostProps = {
  title: string
  cookTime: string
  ingredients: string[]
  instructions: string[]
  imageUrl: string
  notes: string
  username: string
}

export async function getPosts(): Promise<{
  postsData?: PostProps[]
  error?: string
}> {
  try {
    const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } })
    const postsData = posts.map((post) => {
      const username = post.username || ""
      return {
        id: post.id,
        name: post.name,
        createdAt: post.createdAt,
        title: post.title,
        imageUrl: post.imageUrl,
        ingredients: post.ingredients,
        instructions: post.instructions,
        cookTime: post.cookTime,
        username,
      }
    })
    return { postsData }
  } catch (error) {
    return { error: "Error fetching posts" }
  }
}

export async function addPostDB(
  post: AddPostProps
): Promise<{ message?: string; error?: string }> {
  const { userId } = auth()
  if (!userId) {
    return { error: "User not authenticated" }
  }

  const user = await db.user.findUnique({ where: { clerkUserId: userId } })

  if (!user) {
    return { error: "User does not exist" }
  }

  try {
    const postData = await db.post.create({
      data: {
        userId,
        title: post.title,
        name: user.name,
        username: user.username,
        cookTime: post.cookTime,
        imageUrl: post.imageUrl,
        ingredients: post.ingredients,
        instructions: post.instructions,
        notes: post.notes,
      },
    })

    return { message: `${postData.title} shared!` }
  } catch (error) {
    return { error: "Post not shared" }
  }
}
