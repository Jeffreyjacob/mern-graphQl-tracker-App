import { gql } from "@apollo/client";


export const SIGN_UP = gql`
  mutation SignUpQuery($input:SignUpInput!){
    signUp(input:$input){ 
    _id,
    username,
    name,
    gender
  }
  }
`
export const LOGIN = gql`
   mutation Login($input:LoginInput!){
    login(input:$input){
        _id,
        name,
        username
    }
   }
`

export const LOGOUT = gql`
  mutation Logout{
    logout{
        message
    }
  }
`