/*....Fetch data from Google sheets using OAuth 2.0 Account
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_CLIENT_ID";
const API_KEY = "YOUR_API_KEY";
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const RANGE = "Sheet1!A1:E10"; // Adjust range as needed

export const fetchSheetData = async () => {
    return new Promise((resolve, reject) => {
        gapi.load("client", async () => {
            try {
                await gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
                    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
                });

                const response = await gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: SPREADSHEET_ID,
                    range: RANGE,
                });

                resolve(response.result.values);
            } catch (error) {
                reject(error);
            }
        });
    });
};
.................*/

/*....Fetch data from Google sheets using Service Account...*/

import {google} import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

// Path to your service account JSON key file
const keyFilePath = path.join(__dirname, '~/Downloads/articulate-bird-449112-h5-d6f45d23fab0.json');

// The Google Sheets ID and range you want to access
const SPREADSHEET_ID = '1LTop0oVGslD1P3yckT9KiJWNSGwZRyKXgH_6_YcMzZk';
const RANGE = 'Sheet1!A1:g99999'; // Adjust range as needed

// Authenticate with the service account
const authenticateWithServiceAccount = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,   // Path to the service account key file
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'], // Scopes for accessing Sheets
    });

    const client = await auth.getClient();
    return client;
};

// Fetch data from the Google Sheets
const fetchSheetData = async (): Promise<any[]> => {
    try {
        const authClient = await authenticateWithServiceAccount();

        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        console.log('Data from Sheet:', response.data.values);
        return response.data.values || []; // Return the data
    } catch (error) {
        console.error('Error fetching sheet data:', error);
        return []; // Return empty array in case of error
    }
};

fetchSheetData();