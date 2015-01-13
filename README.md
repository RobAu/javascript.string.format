# StringFormat.js

Javascript implementation of java's String.format(), with additions to support formatting a percentage and postfix-SI, like 120M, 30K. 

Basic start of porting Formatter.format() to javascript. Currently depends on .toLocaleString() for named-date formatting.

Supported conversion:

- string (%s)
- float, double, long and int (%d, %f); 
- number as percentage (%p)
- number as SI postfix (%i), for example 123.4M, 23K 
- all numeric date conversion (%tH, %tM etc,) for all browsers
- named date conversion (Jan, Feb) for all browsers that support Date.toLocaleString()

Supported flags:

- '-': 	The result will be left-justified. 
- '+':  The result will always include a sign 
- ' ':  The result will include a leading space for positive values 
- '0': 	The result will be zero-padded 
- ',':  The result will include locale-specific grouping separators
- '(':  The result will enclose negative numbers in parentheses 

Below is a list of examples (scroll to the right to see the output) 

<table border="1"><tbody><tr><td>Format string</td><td>Input data</td><td>Formatted</td></tr><tr><td><pre>Testing 1..2..3.. %(,d Aap!</pre></td><td><pre>-50000</pre></td><td>Testing 1..2..3.. (50,000) Aap!</td></tr><tr><td><pre>Percent sign: %%</pre></td><td><pre>20</pre></td><td>Percent sign: %</td></tr><tr><td><pre>Duke's Birthday: %tc</pre></td><td><pre>Tue Dec 16 2014 01:00:00 GMT+0100 (CET)</pre></td><td>Duke's Birthday: Tue Dec 16 01:00:00 GMT+1 2014</td></tr><tr><td><pre>Duke's Birthday: %tF</pre></td><td><pre>Tue Dec 16 2014 01:00:00 GMT+0100 (CET)</pre></td><td>Duke's Birthday: 2014-12-16</td></tr><tr><td><pre>Duke's Birthday: %1$td-%1$tm-%1$tY</pre></td><td><pre>Tue Dec 16 2014 01:00:00 GMT+0100 (CET)</pre></td><td>Duke's Birthday: 16-12-2014</td></tr><tr><td><pre>Duke's Birthday: %1$ta %1$te %1$tb, %1$tY</pre></td><td><pre>Tue Dec 16 2014 01:00:00 GMT+0100 (CET)</pre></td><td>Duke's Birthday: Tue 16 Dec, 2014</td></tr><tr><td><pre>Duke's Birthday: %1$tA %1$te %1$tB, %1$tY</pre></td><td><pre>Tue Dec 16 2014 01:00:00 GMT+0100 (CET)</pre></td><td>Duke's Birthday: Tuesday 16 December, 2014</td></tr><tr><td><pre>Testing 1..2..3.. %05.0f Aap!</pre></td><td><pre>-2.4</pre></td><td>Testing 1..2..3.. -00002 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. %d Aap!</pre></td><td><pre>5</pre></td><td>Testing 1..2..3.. 5 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. %,.4f Aap!</pre></td><td><pre>-2345238.4</pre></td><td>Testing 1..2..3.. -2,345,238.4000 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. %.0f Aap!</pre></td><td><pre>-2.4</pre></td><td>Testing 1..2..3.. -2 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. %,.5f Aap!</pre></td><td><pre>-22222.44444</pre></td><td>Testing 1..2..3.. -22,222.44444 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. %.2f Aap!</pre></td><td><pre>-2.4</pre></td><td>Testing 1..2..3.. -2.40 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. € %.2f %.6f Aap!</pre></td><td><pre>-2.4,5.6</pre></td><td>Testing 1..2..3.. € -2.40 -2.400000 Aap!</td></tr><tr><td><pre>Testing 1..2..3.. € %1$.2f %1$.6f Aap!</pre></td><td><pre>-2.4</pre></td><td>Testing 1..2..3.. € -2.40 -2.400000 Aap!</td></tr></tbody></table>

See the documentation for the format-options at: http://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html
