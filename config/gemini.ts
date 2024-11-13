const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Create kids story on description for 5-8 Years kids, Educational story, and all images in Paper cut stule: story of boy and Magix School, give me 5 chapters, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"title\": \"Leo and the Magix School\",\n  \"coverImage\": {\n    \"prompt\": \"Paper cut style illustration of a boy, Leo, with bright, curious eyes, wearing a blue shirt and brown shorts, standing in front of a whimsical, colorful school building made of paper cut shapes. Stars and sparkles surround the school. The title 'Leo and the Magix School' is written in a playful, hand-drawn font.\",\n    \"style\": \"Paper cut\"\n  },\n  \"chapters\": [\n    {\n      \"title\": \"Leo's Ordinary Day\",\n      \"text\": \"Leo loved ordinary days.  He loved playing with his dog, Sparky, a fluffy terrier with floppy ears. He loved building amazing towers with blocks, each one taller than the last.  But today felt… a little different. A shimmery, golden envelope arrived, addressed to him in elegant, swirling letters.\",\n      \"image\": {\n        \"prompt\": \"Paper cut style illustration showing Leo playing with his dog Sparky in a sunny garden.  Leo is building a block tower. A golden envelope with a magical glow rests on the ground near him. The scene is vibrant and playful.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"title\": \"The Mysterious Invitation\",\n      \"text\": \"Inside the golden envelope was an invitation! It was to the Magix School, a school where children learned amazing magic. Leo gasped! He'd always dreamed of learning magic – turning blocks into bouncy castles, making Sparky fly, and maybe even growing a tree full of chocolate cookies!\",\n      \"image\": {\n        \"prompt\": \"Paper cut style illustration of Leo reading the golden invitation. The invitation is detailed, showing a whimsical school with towers, colorful flags, and children doing magic tricks. Leo's eyes are wide with wonder.Sparky looks curiously at the invitation.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"title\": \"Journey to Magix School\",\n      \"text\": \"Leo packed his favorite toy dinosaur, Rex, and a bag of sparkly cookies.  He followed the directions on the invitation, which led him through a whispering forest and across a rainbow bridge.  It was the most amazing journey he'd ever been on!\",\n      \"image\": {\n        \"prompt\": \"Paper cut style illustration of Leo walking through a whimsical forest with colorful trees and flowers made of paper cut shapes.  A rainbow bridge arches across the scene. Leo carries a backpack and Rex the dinosaur. The style is dreamlike and magical.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"title\": \"Magix School Lessons\",\n      \"text\": \"Magix School was even more amazing than Leo imagined! He learned to make flowers bloom with a flick of his wrist, conjure shimmering butterflies, and even make his shoes float! His teacher, Ms. Willow, a kind wizard with twinkling eyes, showed him how to harness his imagination.\",\n      \"image\": {\n        \"prompt\": \"Paper cut style illustration of Leo in a classroom at Magix School.  Ms. Willow, a kind-looking wizard, is teaching a group of children.  Paper cut shapes of flowers, butterflies, and floating shoes are scattered around the scene.  The classroom is bright and whimsical.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"title\": \"Leo's Magical Adventure Ends (For Now)\",\n      \"text\": \"After a day of magical fun, it was time for Leo to go home. He promised to visit Magix School again soon. He waved goodbye to Ms. Willow and his new friends, his heart full of wonder and magic.  He knew, even back in his ordinary world, a little bit of magic would always stay with him.\",\n      \"image\": {\n        \"prompt\": \"Paper cut style illustration of Leo waving goodbye to Ms. Willow and his friends at Magix School. He's carrying Rex and a bag full of magical objects, like shimmering stones and a miniature rainbow.  Sparky is waiting for him at the edge of the rainbow bridge. The scene is filled with warmth and happiness.\",\n        \"style\": \"Paper cut\"\n      }\n    }\n  ]\n}\n```\n" },
            ],
        },
    ],
});
