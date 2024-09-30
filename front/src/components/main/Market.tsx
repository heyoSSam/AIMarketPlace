import List from './List';
import ListForm from './Form'

export default function Market(){
    return (
        <>
            <div className="grid grid-cols-4 gap-10">
                <List />
            </div>

            <hr className="my-9"></hr>

            <ListForm />
        </>
        
    )
}