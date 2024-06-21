import { PromisePool } from '@supercharge/promise-pool';


/* Use cases of Promise Pools
 - You have a lot of data to process
 - Improve performance of your application
 - You want to control how much it processes asynchronously
*/

/* Example data */
const mockData = [
    { recordName: 'One', body: 'This is my first record'},
    { recordName: 'Two', body: 'This is my second record'},
    { recordName: 'Three', body: 'This is my third record'},
    { recordName: 'Four', body: 'This is my fourth record'},
    { recordName: 'Five', body: 'This is my fifth record'},
    { recordName: 'Six', body: 'This is my sixth record'}
]

console.log('Starting execution');
promisePoolExample(mockData);



async function promisePoolExample(data) {
    /* Documentation: */
    const { results, errors } = await PromisePool
        .for(data)
        .withConcurrency(2) // Default is 10
        .process (async (record : any) => {
           await delay(10000);
           processData(record); // do i need an await here?

            console.log(record);
            console.log(`Record ${record.recordName} processed`)
            return record;
        });
    
    console.log(`Results: ${JSON.stringify(results)}`);
    /* Expected
        [
            { recordName: 'One', body: 'This is my new body for Record One},
            { recordName: 'Two', body: 'This is my new body for Record Two'},
            { recordName: 'Three', body: 'This is my new body for Record Three'}
        ]
    */
    
    /* For more documentation for managing errors, such as custom error handling: */
    /*
    errors.forEach(error => {
        console.log(`Record ${error.item.recordName} failed`)
    })*/
}


/** Waits 10 seconds and then replaces the record's body with a new one 
*@param data This is a record from our mockData array
*@returns Returns manipulated record from our mockData 
*/

async function processData (data) {
    data.body = `This is my new body for Record ${data.recordName}`; // 10 seconds
    return data;
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
