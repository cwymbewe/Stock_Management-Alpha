import { google } from 'googleapis';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Path to your service account JSON key file
const keyFilePath = process.env.SERVICE_ACCOUNT_KEY_PATH; // Use the environment variable

// The Google Sheets ID and range you want to access
const SPREADSHEET_ID = '1LTop0oVGslD1P3yckT9KiJWNSGwZRyKXgH_6_YcMzZk';
const RANGE = 'Sheet1!A1:g99999'; // Adjust range as needed

// Authenticate with the service account
const authenticateWithServiceAccount = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,   // Path to the service account key file
        scopes: ['https://www.googleapis.com/auth/spreadsheets'], // Scopes for accessing Sheets
    });

    const client = await auth.getClient();
    return client;
};

// Fetch data from the Google Sheets
const fetchSheetData = async (): Promise<any[]> => {
    try {
        const authClient = await authenticateWithServiceAccount();

        const sheets = google.sheets({ version: 'v4', auth: authClient as any });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        console.log('Data from Sheet:', response.data.values || []);
        return response.data.values || []; // Return the data
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return []; // Return empty array in case of error
    }
};

// Append data to Google Sheets
export const appendToGoogleSheet = async (data) => {
    try {
        const authClient = await authenticateWithServiceAccount();
        const sheets = google.sheets({ version: 'v4', auth: authClient as any });

        console.log('Data to append:', data); // Log the data being appended

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
            valueInputOption: 'RAW',
            requestBody: {
                values: [[data.itemQuantity, data.storeLocation, data.user, new Date().toISOString()]],
            },
        });

        console.log('Data appended to Google Sheets:', data.itemQuantity, data.storeLocation, data.user);
    } catch (error) {
        console.error('Error appending data to Google Sheets:', error);
    }
};

fetchSheetData();
