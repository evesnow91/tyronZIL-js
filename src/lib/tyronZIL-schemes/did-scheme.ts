/*
    TyronZIL-js: Decentralized identity client for the Zilliqa blockchain platform
    Copyright (C) 2020 Julio Cesar Cabrapan Duarte

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

export enum NetworkNamespace {
    Mainnet = 'main:',
    Testnet = 'test:',
}

export interface SchemeInputData {
    network: NetworkNamespace;
    didUniqueSuffix: string;
}

/** Defines the tyronZIL DID scheme */
export default class TyronZILScheme {
    public static readonly schemeIdentifier = 'did:';
    public static readonly methodName = 'tyron:';
    public static readonly blockchain = 'zil:';
    public readonly network: NetworkNamespace;
    public readonly didUniqueSuffix: string;
    public readonly did_tyronZIL: string;   // the fully constructed DID

    constructor (
        input: SchemeInputData
    ) {
        this.network = input.network;
        this.didUniqueSuffix = input.didUniqueSuffix;
        this.did_tyronZIL = TyronZILScheme.schemeIdentifier + TyronZILScheme.methodName + TyronZILScheme.blockchain + this.network + this.didUniqueSuffix;
    }

    /** Generates a tyronZIL DID with the given didUniqueSuffix and network */
    public static async newDID(input: SchemeInputData): Promise<TyronZILScheme> {

        const SCHEME_DATA: SchemeInputData = {
            network: input.network,
            didUniqueSuffix: input.didUniqueSuffix,
        };

        return new TyronZILScheme(SCHEME_DATA);
    }
}