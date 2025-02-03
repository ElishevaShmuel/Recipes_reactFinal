export type user = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: string;
    phon: string;
    isConected?: boolean;
};

type Action =
    | { type: "CREATE"; data: user }
    | { type: "UPDATE"; data: Partial<user> }; // השתמש ב-Partial כדי לאפשר עדכון חלקי

export function userReduse(state: user, action: Action): user {
    switch (action.type) {
        case 'CREATE':
           
        case 'CREATE':
            state=action.data
            state.isConected=true
            return state as user
        case 'UPDATE':
            console.log('up');
            return{
                first_name : action.data.first_name || state.first_name,
                last_name: action.data.last_name ||state.last_name,
                email : action.data.email ||state.email,
                password : action.data.password ||state.password,
                address : action.data.address ||state.address,
                phon: action.data.phon ||state.phon,     
            } as user        
        default:
            return state;
    }
}
