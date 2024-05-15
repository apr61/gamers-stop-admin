import supabase from "../../utils/supabase";

// Function to insert a document into Supabase
const insertRecord = async (documentData: any, tableName: string) => {
  try {
    const { data, error } = await supabase.from(tableName).insert(documentData);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to update a document in Supabase by ID
const updateRecordById = async (
  documentData: any,
  tableName: string,
  id: string,
) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(documentData)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to delete a document from Supabase by ID
const deleteRecordById = async (tableName: string, id: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return id;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to read a document from Supabase by ID
const readRecordById = async (tableName: string, id: string) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to read all documents from a table in Supabase
const readAllRecords = async (tableName: string) => {
  try {
    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export {
  insertRecord,
  updateRecordById,
  deleteRecordById,
  readRecordById,
  readAllRecords,
};
