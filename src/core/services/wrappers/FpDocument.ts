import { Injectable } from '@angular/core';

@Injectable()
export class FpDocument extends Document {}

export function getDocument(): any { return document; }
