import { Injectable } from '@angular/core';

@Injectable()
export class FpWindow extends Window {}

export function getWindow(): any { return window; }
