import { writable } from 'svelte/store';
import playerDefaultLogo from '$lib/images/github.svg';

export enum PlayerType {
    JUST_HOMEBUYER = "Just a Homebuyer",
    SMALL_FLIPPER = "Small Flipper",
    MEDIUM_FLIPPER = "Medium Flipper",
    LARGE_FLIPPER = "Large Flipper",
    INSTITUTIONAL_FLIPPER = "Institutional Flipper"
}

export const NameByPlayerType = {
    [PlayerType.JUST_HOMEBUYER]: [
        "John Doe", 
        "Emily Davis (first-time buyer)",
        "Carlos & Priya Martinez (family home)"
    ],
    [PlayerType.SMALL_FLIPPER]: [
        "Mike & Karisa Thompson", 
        "Sarah's Flip Co. (local LLC)",
        "Tommy Nguyen (handyman-turned-investor)"
    ],
    [PlayerType.MEDIUM_FLIPPER]: [
        "Whitney Elkins-Hutten", 
        "Urban Renewal Partners LLC",
        "Brick & Beam Renovations"
    ],
    [PlayerType.LARGE_FLIPPER]: [
        "Khosravi & Blue Team", 
        "MetroFlip Masters",
        "Elite Property Solutions Group"
    ],
    [PlayerType.INSTITUTIONAL_FLIPPER]: [
        "Boston Capital REIT", 
        "Northeast Renovation Capital",
        "American Housing Opportunity Fund",
        "Zillow Offers (hypothetical expansion)",
        "Boston Metro Flip Fund"
    ]
};

export const SvgByPlayerType = {
    [PlayerType.JUST_HOMEBUYER]: playerDefaultLogo,
    [PlayerType.SMALL_FLIPPER]: playerDefaultLogo,
    [PlayerType.MEDIUM_FLIPPER]: playerDefaultLogo,
    [PlayerType.LARGE_FLIPPER]: playerDefaultLogo,
    [PlayerType.INSTITUTIONAL_FLIPPER]: playerDefaultLogo,
};

const defaultPlayerType = PlayerType.JUST_HOMEBUYER;
export const selectedPlayerType = writable<PlayerType>(defaultPlayerType);
export const selectedPlayerIndex = writable<number>(0);
export const currentPlayerSvg = writable<string>(SvgByPlayerType[defaultPlayerType]);

export function getCurrentPlayerName(type: PlayerType, index: number): string {
    return NameByPlayerType[type][index];
}

export function getCurrentPlayerSvg(type: PlayerType): string {
    return SvgByPlayerType[type];
} 