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

import TyronZILScheme from '../tyronZIL-schemes/did-scheme';
import OperationType from '@decentralized-identity/sidetree/dist/lib/core/enums/OperationType';
import DeactivateOperation from '@decentralized-identity/sidetree/dist/lib/core/versions/latest/DeactivateOperation';
import { Cryptography, JwkEs256k } from '../did-keys';
import Jws from '@decentralized-identity/sidetree/dist/lib/core/versions/latest/util/Jws';
import { DeactivateSignedDataModel } from '../models/signed-data-models';

/** Defines input data for a Sidetree-based `DID-deactivate` operation */
export interface DeactivateOperationInput {
    did_tyronZIL: TyronZILScheme;
    recoveryPrivateKey: JwkEs256k;
}

/** Defines output data of a Sidetree-based `DID-deactivate` operation */
interface DeactivateOperationOutput {
    did_tyronZIL: TyronZILScheme;
    operationRequest: RequestData;
    operationBuffer: Buffer;
    deactivateOperation: DeactivateOperation;
}

/** Defines data for a Sidetree DeactivateOperation REQUEST*/
interface RequestData {
    did_suffix: string,
    signed_data: string;
    type?: OperationType.Deactivate
}

/** Generates a Sidetree-based `DID-deactivate` operation */
export default class DidDeactivate {
    public readonly did_tyronZIL: TyronZILScheme;
    public readonly operationRequest: RequestData;
    public readonly operationBuffer: Buffer;
    public readonly deactivateOperation: DeactivateOperation;
    public readonly type: OperationType.Deactivate;
    public readonly didUniqueSuffix: string;
    public readonly signedDataJws: Jws;
    public readonly signedData: DeactivateSignedDataModel;
    
    private constructor (
        operationOutput: DeactivateOperationOutput
    ) {
        this.did_tyronZIL = operationOutput.did_tyronZIL;
        this.operationRequest = operationOutput.operationRequest;
        this.operationBuffer = operationOutput.operationBuffer;
        this.deactivateOperation = operationOutput.deactivateOperation;
        this.type = OperationType.Deactivate;
        this.didUniqueSuffix = operationOutput.deactivateOperation.didUniqueSuffix;
        this.signedDataJws = operationOutput.deactivateOperation.signedDataJws;
        this.signedData = {
            did_suffix: operationOutput.deactivateOperation.signedData.didSuffix,
            recovery_key: operationOutput.deactivateOperation.signedData.recoveryKey
        };
    }

    /** Generates a Sidetree-based `DID-deactivate` operation */
    public static async execute(input: DeactivateOperationInput): Promise<DidDeactivate> {
        
        /** To create the Deactivate Operation Signed Data Object */
        const SIGNED_DATA: DeactivateSignedDataModel = {
            did_suffix: input.did_tyronZIL.didUniqueSuffix,
            recovery_key: Cryptography.getPublicKeyNoKid(input.recoveryPrivateKey),
        };
        const recoveryNoKid = Cryptography.removeKid(input.recoveryPrivateKey);
        const SIGNED_DATA_JWS = await Cryptography.signUsingEs256k(SIGNED_DATA, recoveryNoKid);
        
        /** DID data to generate a Sidetree DeactivateOperation */
        const OPERATION_REQUEST: RequestData = {
            did_suffix: input.did_tyronZIL.didUniqueSuffix,
            signed_data: SIGNED_DATA_JWS,
            type: OperationType.Deactivate
        };

        const OPERATION_BUFFER = Buffer.from(JSON.stringify(OPERATION_REQUEST));
              
        /** Executes the Sidetree DeactivateOperation */
        const DEACTIVATE_OPERATION = await DeactivateOperation.parse(OPERATION_BUFFER);
        
        /** Output data from a Sidetree-based `DID-deactivate` operation */
        const OPERATION_OUTPUT: DeactivateOperationOutput = {
            did_tyronZIL: input.did_tyronZIL,
            operationRequest: OPERATION_REQUEST,
            operationBuffer: OPERATION_BUFFER,
            deactivateOperation: DEACTIVATE_OPERATION,    
        };

        return new DidDeactivate(OPERATION_OUTPUT);
    }
}
