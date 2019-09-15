import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Observable, of, throwError as observableThrowError } from 'rxjs';
// import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'app-task2',
    templateUrl: './task2.component.html',
    styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {

    public allCharacters = [];
    public sortedCharacters = [];
    public filteredData = [];
    public url = 'https://swapi.co/api/people/?format=json';
    public pageNo = 0;
    public isButtonDisabled = false;

    @ViewChild('searchCharacter', { static: true }) searchCharacter: ElementRef;

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {

        this.getData();

        /*
            !   REF
            *    
            *   https://www.freakyjolly.com/angular-7-6-add-debounce-time-using-rxjs-6-x-x-to-optimize-search-input-for-api-results-from-server/
        */
        fromEvent(this.searchCharacter.nativeElement, 'keyup')
            .pipe(
                // get value
                map((event: any) => {
                    return event.target.value;
                }),
                // if character length greater then 1
                // , filter(res => res.length > 1)
                // Time in milliseconds between key events
                debounceTime(1000),
                // If previous query is diffent from current   
                distinctUntilChanged()
                // subscription for response
            )
            .subscribe((text: string) => {

                if (text && text != null)
                    this.filteredData = this.filterBy('name', text, 'matches');
                else
                    this.filteredData = this.allCharacters;
            });
    };

    public getData() {

        this.isButtonDisabled = true;

        this.getAllCharacters()
            .subscribe((result) => {

                if( result && result != null )
                {
                    this.isButtonDisabled = result.next ? false : true;

                    let thisResult = result.results.map((thisResult) => {

                        thisResult['birthYear'] = this.getBirthYear(thisResult.birth_year);

                        return thisResult;
                    });

                    this.allCharacters = this.allCharacters.concat(thisResult);

                    if (this.searchCharacter.nativeElement && this.searchCharacter.nativeElement.value && this.searchCharacter.nativeElement.value != null)
                        this.filteredData = this.filterBy('name', this.searchCharacter.nativeElement.value, 'matches');
                    else
                        this.filteredData = this.allCharacters;

                    let copiedData = this.allCharacters.map(x => Object.assign({}, x));;

                    this.sortedCharacters = this.sortAgeWise( copiedData )
                }

            }, (err) => {

            });
    };

    public getAllCharacters(): Observable<any> {
        return this.http.get(this.getUrl());
    };

    public getUrl(): string {

        this.pageNo++;

        return this.url + '&page=' + this.pageNo;
    };

    public filterBy( filterKey: string, filterValue: any, matchBy: string = 'equal' ) {
        return this.allCharacters.filter(( thisCharacter ) => {

            if (thisCharacter[filterKey] && filterValue )
            {
                if( matchBy == 'equal' )
                {
                    return thisCharacter[filterKey] == filterValue;
                }
                else if( matchBy == 'lessthan' )
                {
                    return thisCharacter[filterKey] <= filterValue;
                }
                else if( matchBy == 'greaterthan' )
                {
                    return thisCharacter[filterKey] >= filterValue;
                }
                else if( matchBy == 'matches' )
                {
                    let theValue = thisCharacter[filterKey].toString().toLowerCase(),
                        matchingValue = filterValue.toString().toLowerCase();

                    if(theValue.indexOf( matchingValue ) > -1)
                        return thisCharacter;
                }
            }
        });
    };

    public getAverageOf( theKey: string) {

        let average = 0;

        this.allCharacters.map(( thisCharacter ) => {

            let thisKeyValue = thisCharacter[theKey];

            if( thisKeyValue && !isNaN(thisKeyValue) )
                average += parseInt( thisKeyValue );
            
            // console.log('thisCharacter['+ theKey +']', thisKeyValue, average);
        });

        return Math.round(average/this.filteredData.length);
    };

    public getBirthYear(birthYear: string): number {

        let calculatedBirthYear = 0;

        if( birthYear && !isNaN( parseFloat(birthYear) ) )
            calculatedBirthYear = parseFloat(birthYear);

        return calculatedBirthYear;
    };

    public sortAgeWise(data) {
        return data.sort(( aChar, bChar ) => {

            let aCharAge = aChar.birthYear,
                bCharAge = bChar.birthYear;

            if( aCharAge > bCharAge )
                return 1;
            else if( aCharAge < bCharAge )
                return -1;

            return 0;
        });
    };
}
