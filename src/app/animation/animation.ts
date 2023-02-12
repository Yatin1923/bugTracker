import{
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes
} from '@angular/animations'
import { state } from '@angular/animations';

export const fader = 
    trigger('routeAnimations',[
        transition( '*<=>*',[
            query(':enter,:leave',[
                style({
                    position: 'absolute',
                    top:0,
                    width: '100%',
                    opacity: 0
                   
                }),
            ],{ optional: true }),
            query(':enter',[
                animate('600ms ease',
                style({ opacity: 1  }))
            ],{ optional: true }),
            
        ]),
    ]);

