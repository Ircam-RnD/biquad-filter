# Biquad Filter library

> The Biquad Filter is a JavaScript library that implements a cascade of biquad filters

This library implements a [biquad filter](http://en.wikipedia.org/wiki/Digital_biquad_filter) with the possibility of use a cascade of biquad filters where you can specify the coefficients:

```
                       1 + b1*z^-1 + b2*z^-2
One biquad:   H1(z) = -----------------------
                       1 + a1*z^-1 + a2*z^-2

Cascade of biquads:   H(z) = g · H1(z) · H2(z) · ... · Hn(z)   
where g is the global gain of the cascade of biquads and n is the number of biquad filters.

```