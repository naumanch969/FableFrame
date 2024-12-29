import {
    GENRE_ACTION,
    GENRE_ADVENTURE,
    GENRE_COMEDY,
    GENRE_DRAMA,
    GENRE_FANTASY,
    GENRE_HISTORICAL,
    GENRE_HORROR,
    GENRE_MYSTERY,
    GENRE_MYTHOLOGY,
    GENRE_SCIFI,
    GENRE_THRILLER,
    GENRE_ROMANTIC,
    AGE_CATEGORY_CHILDREN,
    AGE_CATEGORY_TEEN,
    AGE_CATEGORY_ADULT,
    IMAGE_STYLE_3D,
    IMAGE_STYLE_PAPER_CUT,
    IMAGE_STYLE_PIXEL,
    IMAGE_STYLE_WATER_COLOR,
    IMAGE_STYLE_DIGITAL_ART,
} from './images'

export const CREATE_STORY_PROMPT = `
    Create a captivating story for {age_category} in the {genre} genre, with all images in the {image_style} style. The story title is "{title}". Ensure the story has at least {chapters} chapters. Each chapter must include:
    - A unique and descriptive title.
    - A minimum of 200 words of engaging narrative text tailored to the target audience.
    - A detailed image text prompt describing the visual elements of the chapter.

    Additionally, provide a detailed image prompt for the story cover, incorporating the story title "{title}" and reflecting the overall theme and style. Return the response in a structured JSON format.
`

export const STORY_GENRES = [
    { key: "general", label: "General", image: GENRE_ACTION },
    { key: "fantasy", label: "Fantasy", image: GENRE_FANTASY },
    { key: "sci-fi", label: "Sci-Fi", image: GENRE_SCIFI },
    { key: "mystery", label: "Mystery", image: GENRE_MYSTERY },
    { key: "romance", label: "Romance", image: GENRE_ROMANTIC },
    { key: "horror", label: "Horror", image: GENRE_HORROR },
    { key: "thriller", label: "Thriller", image: GENRE_THRILLER },
    { key: "adventure", label: "Adventure", image: GENRE_ADVENTURE },
    { key: "historical", label: "Historical", image: GENRE_HISTORICAL },
    { key: "non-fiction", label: "Non-fiction", image: GENRE_MYTHOLOGY },
    { key: "drama", label: "Drama", image: GENRE_DRAMA },
    { key: "comedy", label: "Comedy", image: GENRE_COMEDY },
];

export const STORY_STATUSES = [
    { key: "published", label: "Published" },   // Published and visible
    { key: "draft", label: "Draft" },   // Before publishing
    { key: "hidden", label: "Hidden" },   // Hidden by admin
    { key: "deleted", label: "Deleted" },   // Hidden by admin
    { key: "blocked", label: "Blocked" }    // if reported >=5 times
];

export const STORY_IMAGE_STYLES = [
    { key: "3D-cartoon", label: "3D Cartoon", image: IMAGE_STYLE_3D },
    { key: "paper-cut", label: "Paper Cut", image: IMAGE_STYLE_PAPER_CUT },
    { key: "water-color", label: "Watercolor", image: IMAGE_STYLE_WATER_COLOR },
    { key: "pixel-style", label: "Pixel Style", image: IMAGE_STYLE_PIXEL },
    { key: "digital-art", label: "Digital Art", image: IMAGE_STYLE_DIGITAL_ART },
];

export const STORY_AGE_CATEGORIES = [
    { key: "children", label: "Children", image: AGE_CATEGORY_CHILDREN },
    { key: "teens", label: "Teens", image: AGE_CATEGORY_TEEN },
    { key: "young_adult", label: "Adult", image: AGE_CATEGORY_ADULT },
];

export const STORY_TYPES = [
    { key: "ai_generated", label: "AI Generated" },
    { key: "manual", label: "Manual" }
];

export const USER_ROLES = [
    { key: "user", label: "User" },
    { key: "admin", label: "Admin" }
];

export const NOTIFICATION_TYPES = [
    { key: "comment", label: "Comment" },
    { key: "like", label: "Like" },
    { key: "share", label: "Share" },
    { key: "follow", label: "Follow" },
    { key: "reply", label: "Reply" },
    { key: "post", label: "Post" },
];

export const NOTIFICATION_PRIORITIES = [
    { key: "critical", label: "Critical" },
    { key: "high", label: "High" },
    { key: "normal", label: "Normal" },
    { key: "low", label: "Low" },
];

export const SHARE_RESTRICTIONS = [
    { key: "read-only", label: "Read-Only" },
    { key: "limited-time", label: "Limited Time" },
    { key: "full-access", label: "Full Access" }
];

export const STORY_REPORT_STATUSES = [
    { key: "pending", label: "Pending" },
    { key: "resolved", label: "Resolved" },
    { key: "dismissed", label: "Dismissed" }
];

export const REPORT_REASONS = [
    { key: "hate_speech", label: "Hate Speech" },
    { key: "violence_or_threats", label: "Violence or Threats" },
    { key: "malicious_content", label: "Malicious Content" },
    { key: "illegal_activity", label: "Illegal Activity" },
    { key: "terrorism_or_extremism", label: "Terrorism or Extremism" },
    { key: "spam_or_advertising", label: "Spam or Advertising" },
    { key: "plagiarism", label: "Plagiarism" },
    { key: "copyright_infringement", label: "Copyright Infringement" },
    { key: "misleading_or_false_information", label: "Misleading or False Information" },
    { key: "offensive_language", label: "Offensive Language" },
    { key: "poor_quality_or_irrelevant_content", label: "Poor Quality or Irrelevant Content" },
    { key: "harassment_or_bullying", label: "Harassment or Bullying" },
    { key: "sharing_personal_information", label: "Sharing Personal Information" },
    { key: "non_age_appropriate_content", label: "Non-age-appropriate Content" },
    { key: "misuse_of_ai_or_tools", label: "Misuse of AI or Tools" }
];

export const ENTITIES_NAMES = [
    { key: "profiles", label: "Profile" },
    { key: "stories", label: "Story" },
    { key: "likes", label: "Like" },
    { key: "comments", label: "Comment" },
    { key: "hashtags", label: "HashTag" },
    { key: "notifications", label: "Notification" },
    { key: "shares", label: "Share" },
    { key: "story_reports", label: "Report" },
    { key: "contacts", label: "Contact" },
];

export const FRIEND_REQUESTS = [
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "rejected", label: "Rejected" },
];

export const PROFILE_VISIBILITY = [
    { key: "public", label: "Public" },
    { key: "private", label: "Private" },
];

export const FONT_TYPE = [
    { key: "default", label: "Default" },
    { key: "dyslexia", label: "Dyslexia" },
];

export const GENDERS = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
];

export const LENGTH = [
    { key: "small", label: "Small" },
    { key: "medium", label: "Medium" },
    { key: "large", label: "Large" },
];

export const THEMES = [
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
    { key: "system", label: "System" },
];

export const LANGUAGES = [
    { key: "en", label: "English" },
];

export const INITIAL_PROFILE_PREFERENCES = {
    profile_id: "",
    theme: "system",
    language: "en",
    font_size: "medium",
    notifications: {
        likes: false,
        shares: false,
        new_features: false,
        story: false,
        friends: false,
        account: false,
    },
    story_preferences: {
        genres: [],
        age_category: [],
        preferred_length: [], // default length
        content_filter: false,
    },
    accessibility: {
        text_to_speech: {
            voice: "female",
            pitch: 1.0,
            speed: 1.0,
        },
        font_type: "default",
        auto_narration: false,
    },
    profile_visibility: "public",
    genre_frequency: [],
    category_frequency: [],
};

export const PLANS = [
    { key: "hobby", label: "Hobby" },
    { key: "pro", label: "Pro" },
    { key: "unlimited", label: "Unlimited" },
];
