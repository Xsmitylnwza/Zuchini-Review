import supabase from "./src/libs/supabase.js";


export async function getGenre() {

    let { data: genres, error } = await supabase
        .from('genres')
        .select('*')


    if (error) throw new Error("Genres could not be loaded");


    return genres


}

const eiei = await getGenre()
console.log(eiei);
