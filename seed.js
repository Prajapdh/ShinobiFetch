import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getCharacters, getCharacterInfo } from './services/characterInfo.js';
import { getClans, getClanInfo } from './services/clanInfo.js';
import { getJutsus, getJutsuInfo } from './services/jutsuInfo.js';
import { getEpisodes, getEpisodeInfo } from './services/EpisodeInfo.js';
import { CharacterModel } from './models/Character.js';
import { ClanModel } from './models/Clan.js';
import { JutsuModel } from './models/Jutsu.js';
import { EpisodeModel } from './models/Episode.js';

dotenv.config();

mongoose.connect(process.env.mongoURL, { useNewUrlParser: true, socketTimeoutMS: 60000 })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

const populateCharacters = async () => {
    const body = await getCharacters();
    const names = body.names;

    for (const name of names) {
        const docs = await CharacterModel.find({ name });
        if (!docs.length) {
            let characters = await getCharacterInfo(name);
            await CharacterModel.create(characters);
        }
    }
}

const populateJutsus = async () => {
    const body = await getJutsus();
    const names = body.names;
    // console.log(names);
    for (const name of names) {
        const docs = await JutsuModel.find({ name });
        if (!docs.length) {
            let jutsu = await getJutsuInfo(name);
            await JutsuModel.create(jutsu);
        }
    }
}

const populateClans = async () => {
    const body = await getClans();
    const names = body.names;

    for (const name of names) {
        const docs = await ClanModel.find({ name });
        if (!docs.length) {
            let clan = await getClanInfo(name);
            await ClanModel.create(clan);
        }
    }
}

const populateEpisodes = async () => {
    const names = await getEpisodes();
    console.log(names);
    for (const name of names) {
        const docs = await EpisodeModel.find({ name });
        if (!docs.length) {
            let episode = await getEpisodeInfo(name);
            await EpisodeModel.create(episode);
        }
    }
}

db.once('once', async () => {
    console.log("Connected");
    await populateCharacters();
    console.log("Characters populated");
    await populateJutsus();
    console.log("Jutsus populated");
    await populateClans();
    console.log("Clans populated");
    await populateEpisodes();
    console.log("Episodes populated");
});
