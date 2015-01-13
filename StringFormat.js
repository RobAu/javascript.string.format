/**
  * StringFormat.js
  *
  * Provides formatting for javascript based on the java FormatString specification. 
  * 
  * See:  http://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html
  *
  *
  * Based on OPENJDK source for String.format() and Formatter.format()
  *  
  * Author: Rob Audenaerde
  * Version: 0.1
  * 
  */ 

	var StringFormat = new function()
	{
		var regex = /%(\d+\$)?([-#+ 0,(\<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/g;

		Date.prototype.getDayOfYear = function() {
			var onejan = new Date(this.getFullYear(),0,1);
			return Math.ceil((this - onejan) / 86400000);
		} 
		function isNotSet(s)
		{
			return (typeof s === "undefined")
		}
	 	function isSet(s)
		{
			return !isNotSet(s);
		}
		function Flags(flags)
		{
			this.flags = flags;
		
	 		this.valueOf = function() 
			{
		    		return flags;
			}

			this.contains = function(f) 
			{
		    		return (this.flags & f.valueOf()) == f.valueOf();
			}

			this.dup = function () { return new Flags(this.flags);}

			this.add    = function (f) { this.flags |=  f.valueOf(); return this;}
			this.remove = function (f) { this.flags &= ~f.valueOf(); return this;}

			this.toString = function()
			{
				var res = "";
				if (this.contains(MyFlags.LEFT_JUSTIFY))  res +=('-');
		    		if (this.contains(MyFlags.UPPERCASE))     res +=('^');
		    		if (this.contains(MyFlags.ALTERNATE))     res +=('#');
		    		if (this.contains(MyFlags.PLUS))          res +=('+');
		    		if (this.contains(MyFlags.LEADING_SPACE)) res +=(' ');
		    		if (this.contains(MyFlags.ZERO_PAD))      res +=('0');
		    		if (this.contains(MyFlags.GROUP))         res +=(',');
		    		if (this.contains(MyFlags.PARENTHESES))   res +=('(');
		    		if (this.contains(MyFlags.PREVIOUS))      res +=('<');
				return res;
			}
	    	}
		Flags.parse = function(s)
		{
			var f = new Flags(0);
		        if (isNotSet(s))
	 		   return f;
			for (var i = 0; i<s.length; i++ )
			{
				var v = Flags.parseChar(s.charAt(i));
			        f.add(v);
			}
			return f;
		}
		Flags.parseChar = function (c)
		{
		   switch (c) 
		   {
			    case '-': return MyFlags.LEFT_JUSTIFY;
			    case '#': return MyFlags.ALTERNATE;
			    case '+': return MyFlags.PLUS;
			    case ' ': return MyFlags.LEADING_SPACE;
			    case '0': return MyFlags.ZERO_PAD;
			    case ',': return MyFlags.GROUP;
			    case '(': return MyFlags.PARENTHESES;
			    case '<': return MyFlags.PREVIOUS;
		   }	
		}    

		// Returns a string representation of the current <tt>Flags</tt>.
		Flags.toString = function (f) {
		    return f.toString();
		}
		Character= 
		{
			isUpperCase : function (c)
			{
				return c == c.toUpperCase();
			},
			toLowerCase : function (c)
			{
				return c.toLowerCase();
			},
		}

		DateTime = 
		{
		

			HOUR_OF_DAY_0 : 'H', // (00 - 23)
			HOUR_0        : 'I', // (01 - 12)
			HOUR_OF_DAY   : 'k', // (0 - 23) -- like H
			HOUR          : 'l', // (1 - 12) -- like I
			MINUTE        : 'M', // (00 - 59)
			NANOSECOND    : 'N', // (000000000 - 999999999)
			MILLISECOND   : 'L', // jdk, not in gnu (000 - 999)
			MILLISECOND_SINCE_EPOCH : 'Q', // (0 - 99...?)
			AM_PM         : 'p', // (am or pm)
			SECONDS_SINCE_EPOCH : 's', // (0 - 99...?)
			SECOND        : 'S', // (00 - 60 - leap second)
			TIME          : 'T', // (24 hour hh:mm:ss)
			ZONE_NUMERIC  : 'z', // (-1200 - +1200) - ls minus?
			ZONE          : 'Z', // (symbol)

			// Date
			NAME_OF_DAY_ABBREV    : 'a', // 'a'
			NAME_OF_DAY           : 'A', // 'A'
			NAME_OF_MONTH_ABBREV  : 'b', // 'b'
			NAME_OF_MONTH         : 'B', // 'B'
			CENTURY               : 'C', // (00 - 99)
			DAY_OF_MONTH_0        : 'd', // (01 - 31)
			DAY_OF_MONTH          : 'e', // (1 - 31) -- like d
			// *     ISO_WEEK_OF_YEAR_2    : 'g', // cross %y %V
			// *     ISO_WEEK_OF_YEAR_4    : 'G', // cross %Y %V
			NAME_OF_MONTH_ABBREV_X  : 'h', // -- same b
			DAY_OF_YEAR           : 'j', // (001 - 366)
			MONTH                 : 'm', // (01 - 12)
			// *     DAY_OF_WEEK_1         : 'u', // (1 - 7) Monday
			// *     WEEK_OF_YEAR_SUNDAY   : 'U', // (0 - 53) Sunday+
			// *     WEEK_OF_YEAR_MONDAY_01 : 'V', // (01 - 53) Monday+
			// *     DAY_OF_WEEK_0         : 'w', // (0 - 6) Sunday
			// *     WEEK_OF_YEAR_MONDAY   : 'W', // (00 - 53) Monday
			YEAR_2                : 'y', // (00 - 99)
			YEAR_4                : 'Y', // (0000 - 9999)

			// Composites
			TIME_12_HOUR  : 'r', // (hh:mm:ss [AP]M)
			TIME_24_HOUR  : 'R', // (hh:mm same as %H:%M)
			// *     LOCALE_TIME   : 'X', // (%H:%M:%S) - parse format?
			DATE_TIME             : 'c',
					    // (Sat Nov 04 12:02:33 EST 1999)
			DATE                  : 'D', // (mm/dd/yy)
			ISO_STANDARD_DATE     : 'F', // (%Y-%m-%d)
			// *     LOCALE_DATE           : 'x', // (mm/dd/yy)
		}
		Conversion =
		{
			//ADDITIONS!
			SI            	    : 'i',
			PERCENTAGE          : 'p',

			//DEFAULT
			DECIMAL_INTEGER     : 'd',
			OCTAL_INTEGER       : 'o',
			HEXADECIMAL_INTEGER : 'x',
			HEXADECIMAL_INTEGER_UPPER : 'X',

			// Float, Double, BigDecimal
			// (and associated primitives due to autoboxing)
			SCIENTIFIC          : 'e',
			SCIENTIFIC_UPPER    : 'E',
			GENERAL             : 'g',
			GENERAL_UPPER       : 'G',
			DECIMAL_FLOAT       : 'f',
			HEXADECIMAL_FLOAT   : 'a',
			HEXADECIMAL_FLOAT_UPPER : 'A',

			// Character, Byte, Short, Integer
			// (and associated primitives due to autoboxing)
			CHARACTER           : 'c',
			CHARACTER_UPPER     : 'C',

			// java.util.Date, java.util.Calendar, long
			DATE_TIME           : 't',
			DATE_TIME_UPPER     : 'T',

			// if (arg.TYPE !: boolean) return boolean
			// if (arg !: null) return true, else return false,
			BOOLEAN             : 'b',
			BOOLEAN_UPPER       : 'B',
			// if (arg instanceof Formattable) arg.formatTo()
			// else arg.toString(),
			STRING              : 's',
			STRING_UPPER        : 'S',
			// arg.hashCode()
			HASHCODE            : 'h',
			HASHCODE_UPPER      : 'H',

			LINE_SEPARATOR      : 'n',
			PERCENT_SIGN        : '%',
			isValid : function (a) { return true;},
	 		isText : function (c) {
		    		switch (c) {
		    			case Conversion.LINE_SEPARATOR:
		    			case Conversion.PERCENT_SIGN:
		        			return true;
		    			default:
		        			return false;
		    		}
			}
	
		}
	
		MyFlags = 
		{
			NONE 		: new Flags(0),
			LEFT_JUSTIFY	: new Flags(1<<0),    // '-'
	       		UPPERCASE       : new Flags(1<<1),    // '^'
	       		ALTERNATE       : new Flags(1<<2),   // '#'

	       		 // numerics
			PLUS          : new Flags(1<<3),   // '+'
			LEADING_SPACE : new Flags(1<<4),   // ' '
	 		ZERO_PAD      : new Flags(1<<5),   // '0'
			GROUP         : new Flags(1<<6),   // ','
			PARENTHESES   : new Flags(1<<7),   // '('

			// indexing
			PREVIOUS      : new Flags(1<<8),   // '<'
		}
		function FixedString(s) 
		{
			this.s = s;
			this.getIndex = function(){ return -2;}
			this.print = function(string) { return this.s} 
		}

		function FormatString(fsa)
		{
	  		this.index = -1;
			this.f = Flags.NONE;
			this.width = null;
			this.precision = null;
			this.dt = false;
		        this.c = null;
	  		var idx =1;

	    		this.setIndex = function(s) 
			{
				if (s != null) 
				{
				    	this.index = parseInt(s.substring(0, s.length - 1));
			    	} 
				else 
				{
					this.index = 0;
				}
				return this.index;
			}

	 		this.setFlags = function(s) 
			{
		    		this.f = Flags.parse(s);
		    		if (this.f.contains(MyFlags.PREVIOUS))
		        		this.index = -1;
		    		return this.f;
			}
			this.getIndex = function () {return this.index;}

			this.setWidth = function (s)
			{
				this.width = -1;
				if (isNotSet(s)) return this.width;
		                this.width  = parseInt(s);
		            	if (this.width < 0)
		                	throw new IllegalFormatWidthException(this.width);
		  		return this.width;
			}
	   		this.setPrecision = function(s) 
			{
		    		this.precision = -1;
		  		if (isNotSet(s)) return this.precision;
		        	this.precision = parseInt(s.substring(1));
		            	if (this.precision < 0)
		                	throw new IllegalFormatPrecisionException(this.precision);
		  		return this.precision;
			}
			this.setConversion = function(s)
			{
				if (isNotSet(s)) return this.c;
				this.c = s.charAt(0);
		    		if (!this.dt) 
				{
		        		if (!Conversion.isValid(this.c))
		            			throw new UnknownFormatConversionException(""+this.c);
		        		if (Character.isUpperCase(this.c))
		            			this.f.add(MyFlags.UPPERCASE);
		        		this.c = Character.toLowerCase(this.c);
		        		if (Conversion.isText(this.c))
		            			this.index = -2;
		    		}
		    		return this.c;
	     		}

			this.setIndex(fsa[idx++]);
			this.setFlags(fsa[idx++]);	
			this.setWidth(fsa[idx++]);	
			this.setPrecision(fsa[idx++]);
		
			if (isSet(fsa[idx]) && fsa[idx].length>0) 
			{
			        this.dt = true;
			        if (fsa[idx]=="T")
			            f.add(MyFlags.UPPERCASE);
		    	}
			this.setConversion(fsa[++idx]);	

			this.printDateTime = function(c, arg)
			{
				//          assert(width == -1);
				var text = '';
				var t=arg; //datetime is stored in t;
			
		    		switch (c) 
				{
					case DateTime.HOUR_OF_DAY_0: // 'H' (00 - 23)
					case DateTime.HOUR_0:        // 'I' (01 - 12)
					case DateTime.HOUR_OF_DAY:   // 'k' (0 - 23) -- like H
					case DateTime.HOUR:          // 'l' (1 - 12) -- like I
						var i = t.getHours();
						if (c == DateTime.HOUR_0 || c == DateTime.HOUR)
						    i = (i == 0 || i == 12 ? 12 : i % 12);
						var flags = (c == DateTime.HOUR_OF_DAY_0
							       || c == DateTime.HOUR_0
							       ? MyFlags.ZERO_PAD
							       : MyFlags.NONE);
						text += (this.localizedMagnitude(i, flags, 2));
						break;
		   			
					case DateTime.MINUTE:       // 'M' (00 - 59)
						var i = t.getMinutes();
						var flags = MyFlags.ZERO_PAD;
						text += (this.localizedMagnitude(i, flags, 2));
						break;
				
					case DateTime.NANOSECOND:   // 'N' (000000000 - 999999999)
						var i = t.getMilliseconds() * 1000000;
						var flags = MyFlags.ZERO_PAD;
						text += (this.localizedMagnitude( i, flags, 9));
						break;
					case DateTime.MILLISECOND:  // 'L' (000 - 999)
						var i = t.getMilliseconds(); ;
						var flags = Flags.ZERO_PAD;
						text += (this.localizedMagnitude( i, flags, 9));
						break;
					case DateTime.MILLISECOND_SINCE_EPOCH:  // 'Q' (0 - 99...?)
						var i = t.getTime(); ;
						var flags = MyFlags.ZERO_PAD;
						text += (this.localizedMagnitude( i, flags, width));
						break;
					case DateTime.AM_PM:        // 'p' (am or pm)
						// Calendar.AM = 0, Calendar.PM = 1, LocaleElements defines upper
						var ampm      = [ "AM", "PM" ];
	 					var hours     = date.getHours();
	 					var ampmIndex = hours >= 12 ? 1 : 0;
						//if (l != null && l != Locale.US) {
						//    DateFormatSymbols dfs = DateFormatSymbols.getInstance(l);
						//    ampm = dfs.getAmPmStrings();
						//}
						var s = ampm[ampmIndex];
						//check flags!
					
						text +=(s.toLowerCase());
						break;
					case DateTime.SECONDS_SINCE_EPOCH:  // 's' (0 - 99...?)
						var i = t.getTime() / 1000;
						var flags = MyFlags.NONE;
						text += (this.localizedMagnitude( i, flags, width));
						break;
					case DateTime.SECOND:       // 'S' (00 - 60 - leap second)
						var i = t.getSeconds() ;
						var flags = MyFlags.ZERO_PAD;
						text +=(this.localizedMagnitude(i, flags, 2));
						break;
					/*
					case DateTime.ZONE_NUMERIC: { // 'z' ({-|+}####) - ls minus?
					int i = t.get(Calendar.ZONE_OFFSET) + t.get(Calendar.DST_OFFSET);
					boolean neg = i < 0;
					sb.append(neg ? '-' : '+');
					if (neg)
					    i = -i;
					int min = i / 60000;
					// combine minute and hour into a single integer
					int offset = (min / 60) * 100 + (min % 60);
					Flags flags = Flags.ZERO_PAD;

					sb.append(this.localizedMagnitude(null, offset, flags, 4, l));
					break;
					}*/
					case DateTime.ZONE:        // 'Z' (symbol)
						var locale = "en-us";
						zone = t.toLocaleTimeString(locale, { timeZoneName: "short" }).split(' ').pop(); //timezone is last element;
						text+= zone;
						break;	
					// Date*/
					case DateTime.NAME_OF_DAY_ABBREV:     // 'a'
						var locale = "en-us";
						month = t.toLocaleString(locale, { weekday: "short" });
						text+= month;
						break;	
					case DateTime.NAME_OF_DAY:           // 'A'
						var locale = "en-us";
						month = t.toLocaleString(locale, { weekday: "long" });
						text+= month;
						break;
					case DateTime.NAME_OF_MONTH_ABBREV:   // 'b'
					case DateTime.NAME_OF_MONTH_ABBREV_X: // 'h' -- same b*/
						var locale = "en-us";
						month = t.toLocaleString(locale, { month: "short" });
						text+= month;
						break;					
					case DateTime.NAME_OF_MONTH:          // 'B'
						var locale = "en-us";
						month = t.toLocaleString(locale, { month: "long" });
						text+= month;
						break;					
					case DateTime.CENTURY:                // 'C' (00 - 99)
					case DateTime.YEAR_2:                 // 'y' (00 - 99)
					case DateTime.YEAR_4:                 // 'Y' (0000 - 9999)
						var i = t.getFullYear();
						var size = 2;
						switch (c) 
						{
							case DateTime.CENTURY:
							    i /= 100;
							    break;
							case DateTime.YEAR_2:
							    i %= 100;
							    break;
							case DateTime.YEAR_4:
							    size = 4;
							    break;
						}
						var flags = MyFlags.ZERO_PAD;
						text+=(this.localizedMagnitude(i, flags, size));
						break;
					case DateTime.DAY_OF_MONTH_0:         // 'd' (01 - 31)
					case DateTime.DAY_OF_MONTH:          // 'e' (1 - 31) -- like d
						var i = t.getDate();
						var flags = (c == DateTime.DAY_OF_MONTH_0 ? MyFlags.ZERO_PAD : MyFlags.NONE);
						text+=(this.localizedMagnitude(i, flags, 2));
						break;
					case DateTime.DAY_OF_YEAR:           // 'j' (001 - 366)
						var i = t.getDayOfYear()
						var flags = MyFlags.ZERO_PAD;
						text+=(this.localizedMagnitude(i, flags, 3));
						break;
					case DateTime.MONTH:                 // 'm' (01 - 12)
						var i = t.getMonth()+ 1;
						var flags = MyFlags.ZERO_PAD;
						text+=(this.localizedMagnitude(i, flags, 2));
						break;
					// Composites
					case DateTime.TIME:         // 'T' (24 hour hh:mm:ss - %tH:%tM:%tS)
					case DateTime.TIME_24_HOUR: // 'R' (hh:mm same as %H:%M)
						var sep = ':';
						text+=this.printDateTime(DateTime.HOUR_OF_DAY_0,t);
						text+=sep;
						text+=this.printDateTime(DateTime.MINUTE,t);
						if (c == DateTime.TIME) {
							text+=sep;
							text+=this.printDateTime(DateTime.SECOND,t);
						}
						break;
					case DateTime.TIME_12_HOUR:   // 'r' (hh:mm:ss [AP]M)
						var sep = ':';
						text+=this.printDateTime(DateTime.HOUR_0,t);	text+=sep;
						text+=this.printDateTime(DateTime.MINUTE,t);	text+=sep;
						text+=this.printDateTime(DateTime.SECOND,t);	text+=' ';
				
						text+=this.printDateTime(t, DateTime.AM_PM);
						// this may be in wrong place for some locales
						break;
				
				
					case DateTime.DATE_TIME:    	 // 'c' (Sat Nov 04 12:02:33 EST 1999)
						var sep = ' ';
						text+=this.printDateTime(DateTime.NAME_OF_DAY_ABBREV,t);	text+=sep;
						text+=this.printDateTime(DateTime.NAME_OF_MONTH_ABBREV,t);	text+=sep;
						text+=this.printDateTime(DateTime.DAY_OF_MONTH_0,t);	text+=sep;
						text+=this.printDateTime(DateTime.TIME,t);	text+=sep;
						text+=this.printDateTime(DateTime.ZONE,t);	text+=sep;
						text+=this.printDateTime(DateTime.YEAR_4,t);	
						break;
					case DateTime.DATE:            	 // 'D' (mm/dd/yy)
						var sep = '/';
						text+=this.printDateTime(DateTime.MONTH,t);	text+=sep;
						text+=this.printDateTime(DateTime.DAY_OF_MONTH_0,t);	text+=sep;
						text+=this.printDateTime(DateTime.YEAR_2,t);	
						break;
					case DateTime.ISO_STANDARD_DATE:  // 'F' (%Y-%m-%d)
						var sep = '-';
						text+=this.printDateTime(DateTime.YEAR_4,t);	text+=sep;
						text+=this.printDateTime(DateTime.MONTH,t);	text+=sep;
						text+=this.printDateTime(DateTime.DAY_OF_MONTH_0,t);	
						break;
					default:
						break;
				}
				return text;
			}

			this.print = function(arg)
			{
				if (this.dt)
				{
					return this.printDateTime(this.c, arg);
				}
				switch(this.c)
				{
            				case Conversion.STRING:
                				return this.printString(arg);
					case Conversion.SI:
						return this.printSI(arg);
					case Conversion.PERCENTAGE:
						return this.printPercentage(arg);
					case Conversion.DECIMAL_FLOAT:
						return this.printFloat(arg);
					case Conversion.DECIMAL_INTEGER:
						return this.printInt(arg, this.f, this.c);
		   			case Conversion.LINE_SEPARATOR:
				       		return "\n";
					case Conversion.PERCENT_SIGN:
		       				return "%";
					default:
						return ""; //shoudl can never happen actually..	
				}
			}
			this.trailingSign = function (isNeg)
			{
				var text="";
				if (isNeg) 
				{
		        		if (this.f.contains(MyFlags.PARENTHESES))
					    text +=(')');
		   		}
		    		return text;
			}
			this.leadingSign = function (isNeg)
			{
				var text="";
				if (!isNeg) 
				{
		        		if (this.f.contains(MyFlags.PLUS)) {
		           			text += ('+');
		        		} else if (this.f.contains(MyFlags.LEADING_SPACE)) {
		        	    		text +=(' ');
		        		}
		    		} else {
					if (this.f.contains(MyFlags.PARENTHESES))
					    text +=('(');
					else
					    text +=('-');
		   		}
		    		return text;
			}
			this.localizedMagnitude = function(anything, f, width)
			{
				var va = ""+anything;
				var dot = va.indexOf('.');
				var len = va.length;
				if (dot < 0) dot = len;
				var text = "";
				var grpSep = '\0';
				var grpSize = 3;
            			if (f.contains(MyFlags.GROUP))
					grpSep = ',';

				var zerochar = '0';
				for (var j = 0; j < len; j++) 
				{
					if (j == dot) {
					    text+=(".");
					    // no more group separators after the decimal separator
					    grpSep = '\0';
					}
					else
					{
						var c = va.charAt(j);
						text += c;

						if (grpSep != '\0' && j != dot - 1 && ((((dot - j) % grpSize)+ grpSize) % grpSize== 1))
						    text+=(grpSep);
					}
				}
				len = text.length;
				if (width!=-1 && f.contains(MyFlags.ZERO_PAD))
				{
					for (var k=0; k<width-len; k++)
						text = zerochar + text;
				}
				return text;	
			}
			this.adjustWidth = function(width, f, neg)
			{
				var newW = width;
		    		if (newW != -1 && neg && f.contains(MyFlags.PARENTHESES))
		        		newW--;
		    		return newW;
			}
			this.printString = function(value)
			{
				return ""+value;
				
			}
			this.printInt = function(value, f, c)
			{
				var text = "";
				if (c == Conversion.DECIMAL_INTEGER) 
				{
					var neg = value < 0.0;
					var v = Math.abs(value);
					text = ""+this.leadingSign(neg);

					var newW = this.width;
					if (newW != -1)
						newW = this.adjustWidth(newW, f, neg);
		                        text+= this.localizedMagnitude(v, f, newW);	
					text+= this.trailingSign(neg);
					return text;
				}
				return "";
			}
	 

			this.printDouble = function(value, f, c, precision, neg)
			{
				var text = "";
				if (c == Conversion.SCIENTIFIC)
				{
					return text;
				}
	 			else if (c == Conversion.DECIMAL_FLOAT) 
				{
					// Create a new FormattedFloatingDecimal with the desired
					// precision.
					var prec = (precision == -1 ? 6 : precision);

					text += value.toFixed(prec); 	

					var newW = this.width;
					if (newW != -1)
						newW = this.adjustWidth(newW, f, neg);
		                        text = this.localizedMagnitude(text, f, newW);			
					return text;
				}
			}
			this.printPercentage = function (arg)
			{
				if (isNaN(arg))
				{
					return this.f.contains(MyFlags.UPPERCASE)? "NAN" :"NaN";
				}
				else
				{
					var symbol = "%";
					var text = "";
					var neg = arg < 0.0;
					var v = Math.abs(arg) * 100.0;
					text += this.leadingSign(neg);
					text += this.printDouble(v, this.f, 'f', this.precision, neg);
					text += this.trailingSign(neg);
					text += symbol;
					return text;
				}
			}
			this.printSI = function (arg)
			{
				if (isNaN(arg))
				{
					return this.f.contains(MyFlags.UPPERCASE)? "NAN" :"NaN";
				}
				else
				{
					var ex     = Math.floor(Math.log(arg) / Math.log(1000));
    					var symbol = "KMGTPEZY".charAt(ex-1);
					var text = "";
					var neg = arg < 0.0;
					var v = Math.abs(arg) / Math.pow( 1000, ex);
					text += this.leadingSign(neg);
					text += this.printDouble(v, this.f, 'f', this.precision, neg);
					text += this.trailingSign(neg);
					text += symbol;
					return text;
				}
			}
	

			this.printFloat = function (arg)
			{
				if (isNaN(arg))
				{
					return this.f.contains(MyFlags.UPPERCASE)? "NAN" :"NaN";
				}
				else
				{
					var text = "";
					var neg = arg < 0.0;
					var v = Math.abs(arg);
					text += this.leadingSign(neg);
					text += this.printDouble(v, this.f, this.c, this.precision, neg);
					text += this.trailingSign(neg);
					return text;
				}
			}
	/*
			if (this.dt)
			      	this.checkDateTime();
		    	else if (Conversion.isGeneral(c))
		        	this.checkGeneral();
		    	else if (Conversion.isCharacter(c))
		       		this.checkCharacter();
		    	else if (Conversion.isInteger(c))
		        	this.checkInteger();
		    	else if (Conversion.isFloat(c))
		        	this.checkFloat();
		   	else if (Conversion.isText(c))
		        	this.checkText();
		    	else
		        	throw new UnknownFormatConversionException(""+this.c);
	*/		
		}
		var parseFormat = function(testpattern)
		{
			var match, results = [];
			var index =0;
			while (match = regex.exec(testpattern)) {
		
				if (match.index != index)
				{
					//we are a fixed string :)
					results.push(new FixedString(testpattern.substring(index, match.index)));
				}
				results.push(new FormatString(match));
				index = match.index + match[0].length;
			}
			if (index < testpattern.length)
			{
				results.push(new FixedString(testpattern.substring(index)));
			}
			return results;
		}
	       
		this.format = function(formatString, args)
		{
			var text = "";
		        var results  = parseFormat(formatString);
			for(var i = 0; i< results.length; i++)
			{
		
				var last = -1;
				var lasto = -1;
				var fs =results[i];
				//console.log("Processing result: " +i);
				var index = fs.getIndex();
				switch (index)
				{
					case -2:
						text += fs.print();
						break;
					case -1:
						if (last < 0 || (isSet(args) && last > args.length - 1))
				        		throw new MissingFormatArgumentException(fs);
				    		text += fs.print((isNotSet(args) ? args : args[last]));
						break;
					case 0:
						lasto++;
				    		last = lasto;
				    		if (isSet(args) && lasto > args.length - 1)
				        		throw new MissingFormatArgumentException(fs.toString());
				    		text += fs.print((isNotSet(args) ? args : args[lasto]));
						break;
					default:  // explicit index
				    		last = index - 1;
				    		if (isSet(args) && last > args.length - 1)
				        		throw new MissingFormatArgumentException(fs.toString());
				    		text += fs.print((isNotSet(args) ? args : args[last]));
				    		break;
				}
		
			}
			return text;
		}
	}
;
