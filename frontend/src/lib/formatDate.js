export function formatDate(timeStamp){
    const date = new Date(parseInt(timeStamp));
   const options = {day:"2-digit",month:"short",year:"numeric"};
   return date.toLocaleDateString("en-us",options);
}