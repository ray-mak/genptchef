# GenPT Chef

GenPT Chef is a recipe generator that creates innovative dishes based on the ingredients users input. It's also a social platform where users can share their recipes and food photos with others.

I designed the UI for this applicaton and developed the back-end API for saving and sharing recipes. The recipes are generated using OpenAI.

## Tech Stack

- TypeScript
- Next.js
- React
- TailwindCSS
- Prisma

## Demo

[Click here to view the live app](https://genptchef.vercel.app/)

## Purpose

The purpose of GenPT Chef was to provide users with creative recipes based on the ingredients they have on hand. While many similar apps search for pre-existing traditional recipes, few offer the ability to generate inventive ones.

GenPT Chef has a slider that allows users to dial up the creativity when generating recipes. This can lead to some very interesting substitutions and dish variations, like ramen patties or mashed potatoes with beef curry.

My goal was to design an intuitive UI that lets users quickly and easily add ingredients. Users can also choose to register an account if they want to save or share recipes with the community.

## The Process

The first step in developing GenPT Chef was creating a front-end interface for users to input their ingredients and a component to display the recipes. Unlike my previous project, Sportfolio, I decided to create the front-end first to determine the type of data I would need to store in the back-end.

After constructing the recipe and ingredient objects in the front-end, I created models in the back-end to store this data. I also developed functions that allowed registered users to save and share generated recipes.

For GenPT Chef, I integrated third party applications to handle image hosting and user management. Previously, I had used JSON Web Tokens for authentication, but for this project, I decided to use Clerk.

I wanted to familiarize myself with other applications, and there was the added benefit of simplifying user registration since Clerk allows users to sign up via Google or Facebook.

For image hosting, I chose Cloudinary. Cloudinary provided a simple and intuitive way for users to share images.

## Problems

The first issue I ran into was integrating OpenAI and crafting prompts to receive consistent structured responses. The initial responses for my recipe requests came back as a string, which made it very tedious to manipulate and store.

Fortunately, OpenAI is capable of formatting the response in JSON format as long as you are specific with the format. After that, I simply needed to trim and parse the data so that I can render and store it on the back-end.

## Lesson Learned

This was my first solo project implementing NextJS and TypeScript. Using Typescript felt a little clunky at first, but once I got used to it, I found it's ability to keep my code consistent invaluable.

I also found the structure of NextJS to be very intuitive. The organization of components and actions made the development process feel more streamlined. Furthermore, the routing system of NextJS simplified the navigation setup, allowing me to focus more on building features.

Overall, this project helped enhance my understanding of these techonologies and gave me the confidence to implement them in future projects.
