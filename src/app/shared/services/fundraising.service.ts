import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Fundraiser } from '../models/fundraising.model';

export interface FundraisingData {
  fundraisers: Fundraiser[];
  additionalFunds: number;
}

@Injectable({ providedIn: 'root' })
export class FundraisingService {

  private http = inject(HttpClient);

  private readonly csvUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrI8XOT7bxytNUCYLcsmP1Eop2Svpudjgj_xQuHx8ZNYw7xwQoNS0dpzfEOmOz-gxseQwyTO5iA_7U/pub?gid=1945498067&single=true&output=csv';

  getFundraisers(): Observable<FundraisingData> {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map(csv => this.parseCsv(csv))
    );
  }

  private parseCsv(csv: string): FundraisingData {

    const lines = csv.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    // Pick up the flat "Additional Funds" metadata row if present
    let additionalFunds = 0;
    for (const line of lines) {
      const cells = this.parseRow(line);
      if (cells[0].replace(/"/g, '').toLowerCase().trim() === 'additional funds') {
        additionalFunds = this.parseAmount(cells[1]);
        break;
      }
    }

    const headerIndex = lines.findIndex(l =>
      l.replace(/"/g, '').toLowerCase().startsWith('fundraiser id')
    );
    if (headerIndex === -1) return { fundraisers: [], additionalFunds };

    const fundraisers = lines
      .slice(headerIndex + 1)
      .map(l => this.parseRow(l))
      .filter(cells => cells.length >= 1 && cells[0].length > 0)
      .map(cells => ({
        id: cells[0] ?? '',
        name: cells[1] ?? '',
        icon: cells[2] ?? '',
        description: cells[3] ?? '',
        startDate: cells[4] ?? '',
        endDate: cells[5] ?? '',
        goal: this.parseAmount(cells[6]),
        currentTotal: this.parseAmount(cells[7]),
        reward: cells[8] ?? '',
        topFundraiser: cells[9] ?? ''
      }));

    return { fundraisers, additionalFunds };
  }

  private parseAmount(value: string | undefined): number {
    if (!value) return 0;
    const num = Number(value.replace(/[$,]/g, '').trim());
    return isNaN(num) ? 0 : num;
  }

  private parseRow(row: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === '"') {
        if (inQuotes && row[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  }
}
