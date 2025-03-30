import Airtable from 'airtable';

// Initialize Airtable client
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

/**
 * Get all records from a table
 * @param {string} tableName - The name of the table
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of records
 */
export async function getAllRecords(tableName, options = {}) {
  try {
    const records = [];
    
    await base(tableName)
      .select(options)
      .eachPage((pageRecords, fetchNextPage) => {
        records.push(...pageRecords);
        fetchNextPage();
      });
    
    return records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    return [];
  }
}

/**
 * Get a single record by ID
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The record ID
 * @returns {Promise<Object>} Record object
 */
export async function getRecordById(tableName, recordId) {
  try {
    const record = await base(tableName).find(recordId);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error fetching record ${recordId} from ${tableName}:`, error);
    return null;
  }
}

/**
 * Create a new record
 * @param {string} tableName - The name of the table
 * @param {Object} fields - The record fields
 * @returns {Promise<Object>} Created record
 */
export async function createRecord(tableName, fields) {
  try {
    const record = await base(tableName).create(fields);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error creating record in ${tableName}:`, error);
    return null;
  }
}

/**
 * Update an existing record
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The record ID
 * @param {Object} fields - The fields to update
 * @returns {Promise<Object>} Updated record
 */
export async function updateRecord(tableName, recordId, fields) {
  try {
    const record = await base(tableName).update(recordId, fields);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error updating record ${recordId} in ${tableName}:`, error);
    return null;
  }
}

/**
 * Delete a record
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The record ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteRecord(tableName, recordId) {
  try {
    await base(tableName).destroy(recordId);
    return true;
  } catch (error) {
    console.error(`Error deleting record ${recordId} from ${tableName}:`, error);
    return false;
  }
}

/**
 * Query records with a filter formula
 * @param {string} tableName - The name of the table
 * @param {string} filterFormula - Airtable filter formula
 * @param {Object} options - Additional query options
 * @returns {Promise<Array>} Array of matching records
 */
export async function queryRecords(tableName, filterFormula, options = {}) {
  try {
    const records = [];
    
    await base(tableName)
      .select({
        filterByFormula: filterFormula,
        ...options,
      })
      .eachPage((pageRecords, fetchNextPage) => {
        records.push(...pageRecords);
        fetchNextPage();
      });
    
    return records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error(`Error querying records from ${tableName}:`, error);
    return [];
  }
}

export default base;
