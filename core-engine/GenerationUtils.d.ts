/**
 * Module used to simplify generation tasks in mods logic.
 */
declare namespace GenerationUtils {
    /**
     * @param id numeric tile ID
     * @returns `true` if block is solid and light blocking block, `false` otherwise.
     */
    function isTerrainBlock(id: number): boolean;

    /**
     * @param id numeric tile ID
     * @returns `true` if block is transparent, `false` otherwise.
     */
    function isTransparentBlock(id: number): boolean;

    /**
     * @returns `true`, if one can see sky from the specified position, `false`
     * otherwise.
     */
    function canSeeSky(x: number, y: number, z: number): boolean;

    /**
     * Generates random x and z coordinates inside specified chunk.
     * @param cx chunk x coordinate
     * @param cz chunk z coordinate
     */
    function randomXZ(cx: number, cz: number): { x: number, z: number };

    /**
     * Generates random coordinates inside specified chunk.
     * @param cx chunk x coordinate
     * @param cz chunk z coordinate
     * @param lowest lowest possible y coordinate. Default is 0
     * @param highest highest possible y coordinate. Default is 128
     */
    function randomCoords(cx: number, cz: number, lowest?: number, highest?: number): Vector;

    /**
     * Finds nearest to the specified y coordinate empty space on the specified
     * x and z coordinates.
     */
    function findSurface(x: number, y: number, z: number): Vector;

    /**
     * Finds nearest to y=128 coordinate empty space on the specified x and z
     * coordinates.
     */
    function findHighSurface(x: number, z: number): Vector;

    /**
     * Finds nearest to y=64 coordinate empty space on the specified x and z
     * coordinates.
     */
    function findLowSurface(x: number, z: number): Vector;

    function lockInBlock(id: number, data: number, checkerTile: any, checkerMode: any): void;

    function setLockedBlock(x: number, y: number, z: number): void;

    /**
     * Generates ore vein on the specified coordinates using specified params.
     * @param params generation params
     * @deprecated Consider using {@link GenerationUtils.generateOre} instead.
     */
    function genMinable(x: number, y: number, z: number, params: {
        /**
         * Ore tile ID.
         */
        id: number,
        /**
         * Ore data.
         */
        data: number,
        /**
         * If `true`, no check for stone is performed so the ore may be
         * generated in the air. Use this to debug ore generation in
         * the superflat worlds.
         */
        noStoneCheck?: number,
        /**
         * Amount of the ore to be generated.
         */
        amount?: number,
        /**
         * If amount is not specified, used to calculate amount.
         */
        ratio?: number,
        /**
         * If amount is not specified, used to calculate amount,
         * using simple formula `size * ratio * 3`.
         */
        size?: number
    }): void;

    /**
     * Generates ore vein on the specified coordinates.
     * @param id ore tile ID
     * @param data ore data
     * @param amount ore amount, use number at least 6 to be able to find 
     * generated ore; note that amount doesn't mean blocks count, it is just an 
     * input value for generation algorithm
     * @param noStoneCheck if `true`, no check for stone is performed so the ore 
     * may be generated in the air. Use this to debug ore generation in the 
     * superflat worlds
     * @param seed random generation seed
     */
    function generateOre(x: number, y: number, z: number, id: number, data: number, amount: number, noStoneCheck: boolean, seed?: number): void;

    /**
     * Generates ore with custom whitelist/blacklist.
     * @param mode if true, specified block IDs are used as whitelist for generation
     * (only the IDs from the list can be replaced with ores), if false - specified 
     * block IDs are used as a blacklist (only the IDs from the list canNOT be 
     * replaced with ores)
     * @param listOfIds array of block IDs to be used as whitelist or blacklist
     * See {@link GenerationUtils.generateOre} for details.
     * @since 2.0.1b17
     */
    function generateOreCustom(x: number, y: number, z: number, id: number, data: number, amount: number, mode: boolean, listOfIds: number[], seed?: number): void;

    /**
     * Retrieves perlin noise value at the specified coordinates.
     * @param seed integer random generator seed. If not specified or set to 0, the default
     * constant value is used
     * @param scale noise size, to set the main octave size, use *1 / octave size*
     * @param numOctaves number of octaves, the more octaves you use, the more 
     * detailed is the generated noise. The next octave is two times smaller then 
     * the previous one
     * @since 2.0.1b11
     */
    function getPerlinNoise(x: number, y: number, z: number, seed?: number, scale?: number, numOctaves?: number): number;
}
