import { Directive, Input, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[match]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true}]
})
export class MatchDirective implements Validator, OnChanges {
  @Input('match') expectedValue: any;

  _onChange: () => void;

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors {
    if (control.value !== this.expectedValue) {
      return { match: 'values must match expected value' }
    }
  }

  registerOnValidatorChange(fn: () => void): void { 
    this._onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('expectedValue' in changes) {
      if (this._onChange) {
        setTimeout(() => this._onChange());
      }
    }
  }  
}
