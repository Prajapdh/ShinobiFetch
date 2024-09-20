import mongoose from 'mongoose';
/**
 * Represents an episode from the Naruto anime.
 */
class Episode {
    constructor() {
        this.name = "";
        this.number = "";
        this.synopsis = "";
        this.trivia = "";
        this.BehindTheScenes = "";
        this.arc = "";
        this.JapaneseAirDate = "";
        this.EnglishAirDate = "";
    }
}

const episodeSchema = new mongoose.Schema({
    name: String,
    number: String,
    synopsis: String,
    trivia: [String],
    BehindTheScenes: String,
    arc: String,
    JapaneseAirDate: String,
    EnglishAirDate: String
});

const EpisodeModel = mongoose.model("Episode", episodeSchema);
export { Episode, EpisodeModel };