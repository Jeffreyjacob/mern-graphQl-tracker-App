import {mergeTypeDefs} from '@graphql-tools/merge'

import userTypeDef from './user.typesDef.js'
import transactionTypeDef from './transactions.typesDef.js'

const mergedTypeDefs  = mergeTypeDefs([userTypeDef,transactionTypeDef]);

export default mergedTypeDefs;
