import { trigger, sequence, state, animate, transition, style, keyframes } from '@angular/animations';

export const rowsAnimation = 
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]);

    export const rowUpdate =
  trigger('rowUpdate', [
    transition('void => *', animate('5000ms', keyframes([
      style({backgroundColor: 'initial', boxShadow: 'none', offset: 0} ),
      style({backgroundColor: 'red', boxShadow: '0 0 5px red', offset: 0.1} ),
      style({backgroundColor: 'initial', boxShadow: 'none', offset: 1} ),
    ])))
  ]);