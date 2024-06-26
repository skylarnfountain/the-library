import { PromisePool } from '@supercharge/promise-pool';

/***************************************************************************************************
 * Promise Pool Speed Test Example *
 * This is a playground example to visualize the differences in setting the concurrency value by utilizing setTimeout
 
 * Expected Results based on a timeout of 10000ms and with a total of six records *
    * withConcurrency(1) takes ~60 seconds for overall execution
    * withConcurrency(2) takes ~30 seconds for overall execution
    * withConcurrency(3) takes ~20 seconds for overall execution
    * withConcurrency(4 or 5) takes ~20 seconds for overall execution
    * withConcurrency(6 or more) takes ~10 seconds for overall execution
    
 * See below for code *
***************************************************************************************************/

console.log('Starting execution');
promisePoolExample();


/** Main processor function that uses promise pools and calls helper functions
* @async
* @returns Returns manipulated record from our mockData
*/
async function promisePoolExample() {
    
    /* Sample data */
    const mockData = [
        { recordName: 'One', body: 'This is my first record' },
        { recordName: 'Two', body: 'This is my second record' },
        { recordName: 'Three', body: 'This is my third record' },
        { recordName: 'Four', body: 'This is my fourth record' },
        { recordName: 'Five', body: 'This is my fifth record' },
        { recordName: 'Six', body: 'This is my sixth record' }
    ]

    /* Documentation: https://superchargejs.com/docs/3.x/promise-pool */
    const { errors } = await PromisePool
        .for(mockData)
        .withConcurrency(2) // Change concurrency here
        .process(async (record) => {
            await delay(10000);
            processData(record);
            console.log(`Record ${record.recordName} processed`);
            return record;
        });

    /* For more documentation for managing errors, such as custom error handling: https://superchargejs.com/docs/3.x/promise-pool#error-handling */
    errors.forEach(error => {
        console.error(`Record ${error.item.recordName} failed: ` + error)
    })
}


/** Replaces a record's body with a new one
* @async
* @param data This is a record from our mockData
* @returns Returns manipulated record from our mockData 
*/
async function processData(data) {
    data.body = `This is my new body for Record ${data.recordName}`; // 10 seconds
    return data;
}

/** Sets a timeout based on ms parameter
* @param ms This is a number in milliseconds
* @returns Returns a Promise to a timeout based on ms
*/
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
