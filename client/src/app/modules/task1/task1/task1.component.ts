import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task1',
    templateUrl: './task1.component.html',
    styleUrls: ['./task1.component.css']
})
export class Task1Component implements OnInit {

    public arr = [];

    constructor() { }

    ngOnInit() {

        for(let i = 1; i <= 100; i++)
        {
            let str = i.toString();
            if(i % 3 == 0 || i % 5 == 0)
            {
                if(i % 3 == 0 && i % 5 != 0)
                {
                    str = 'Fizz';
                }
                else if(i % 3 != 0 && i % 5 == 0)
                {
                    str = 'Buzz';
                }
                else
                {
                    str = 'FizzBuzz';
                }
            }

            this.arr.push( str );
        }
    }

}
