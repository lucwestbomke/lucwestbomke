interface Project {
  link: string;
  images: string[];
  description: string;
  title: string;
  intro: string;
}

export const useProjectData = () => {
  return useState(
    "projectData",
    () =>
      <Project[]>[
        {
          link: "/isadora",
          images: [
            "https://picsum.photos/700/500",
            "https://picsum.photos/701/500",
            "https://picsum.photos/702/500",
            "https://picsum.photos/703/500",
            "https://picsum.photos/704/500",
          ],
          description:
            "Artificial intelligence, or AI, is a rapidly growing field that involves the development of computer programs and systems that can perform tasks typically requiring human intelligence. AI is being used in a wide range of applications, from autonomous vehicles and robotics to natural language processing and image recognition. As AI technology continues to advance, it is expected to transform many industries and create new opportunities for businesses and individuals alike. However, there are also concerns about the potential impact of AI on jobs, privacy, and security, and these issues will need to be carefully addressed as the technology continues to evolve.",
          title: "Isadora",
          intro: "Be creative and draw a picture",
        },
        {
          link: "/melissa",
          images: ["https://picsum.photos/701/500"],
          description:
            "One of the most exciting aspects of artificial intelligence is its potential to help solve some of the world's most pressing problems, such as climate change, disease, and poverty. AI can be used to analyze vast amounts of data, identify patterns and trends, and make predictions that can inform decision-making and policy development. However, there are also risks associated with AI, such as the potential for biases to be built into algorithms and the ethical implications of using AI to make decisions that affect people's lives.",
          title: "Melissa",
          intro: "Upload a picture and let it be drawn by famous artists",
        },
        {
          link: "/taylor",
          images: ["https://picsum.photos/702/500"],
          description:
            "AI is a rapidly evolving field that is poised to have a major impact on society in the coming years. From self-driving cars to virtual assistants, AI is already being used in a wide range of applications, and its potential uses are virtually limitless. However, there are also concerns about the ethical implications of AI, such as the potential for it to be used in ways that violate privacy or discriminate against certain groups of people. As AI continues to develop, it will be important to ensure that its benefits are shared fairly and that its risks are carefully managed.",
          title: "Taylor",
          intro: "Tell Taylor what you want to see",
        },
        {
          link: "/luc",
          images: ["https://picsum.photos/703/500"],
          description:
            "As artificial intelligence becomes more advanced, it is likely to have a profound impact on the workforce. Some experts predict that AI will lead to significant job displacement, as machines become increasingly capable of performing tasks that were previously done by humans. However, others argue that AI will create new jobs and opportunities, particularly in areas such as data analysis, software development, and robotics. Regardless of its impact on the labor market, it is clear that AI will be an important driver of economic growth and innovation in the years to come.",
          title: "Luc",
          intro: "Talk to me",
        },
      ],
  );
};
export function extractValues(array: Project[]) {
  return {
    links: array.map((project) => project.link),
    images: array.map((project) => project.images),
    descriptions: array.map((project) => project.description),
    titles: array.map((project) => project.title),
    intro: array.map((project) => project.intro),
  };
}
