import { encode, decode } from 'base-64';

// Obfuscate the user ID using Base64 encoding
export function obfuscateUserId(Id) {
    return encode(Id);
}

// Decode the obfuscated user ID using Base64 decoding
export function deobfuscateUserId(obfuscatedUserId) {
    return decode(obfuscatedUserId);
}