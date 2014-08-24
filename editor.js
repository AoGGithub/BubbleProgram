window.onload = function()
{
	document.getElementById("codein").addEventListener("keydown", function()
	{
		e = event || window.event;
		var key = e.keyCode;
		if (key == 13)
		{
			submitCode();
		}
	},
	false);

	document.getElementById("codesubmit").addEventListener("click", function()
	{
		submitCode();
	},
	false);
}

function submitCode()
{
	codein = document.getElementById("codein");
	var newLine = codein.value;
	var codeObj = document.getElementById("code");

	if (newLine == "")
	{
		codeObj.innerHTML += "<br />";	
	}
	else
	{
		codeObj.innerHTML += (graphicParse(newLine));
	}
	codein.value = "";
	var container = document.getElementById("code-container");	
	container.scrollTop = container.scrollHeight;
}

function graphicParse(code)
{
	var hasComment = false;
	var returnCode = '<div class="code">';
	for (var char = 0; char < code.length; char++)
	{
		if ((code.charAt(char) == "(") || (code.charAt(char) == ")"))
		{
			if (code.charAt(char) == "(") 
			{
				if (hasComment)
				{
					returnCode += '<span class="bubble-wrapper"><span class="commentbubble">' 
				}
				else
				{
					returnCode += '<span class="bubble-wrapper"><span class="bubble">' 
				}

			}
			else { returnCode += '</span></span>' }		
		}
		else if (code.charAt(char) == "<")
		{
			if ((code.charAt(char + 1) == "-") && (code.charAt(char + 2) == "-"))
			{
				if (hasComment) { returnCode += '<img src="commentArrow.png">'; }
				else { returnCode += '<span class="comment"><img src="commentArrow.png">'; }
				char += 2;
				hasComment = true;
			}
			else { returnCode += code.charAt(char); }
		}
		else { returnCode += code.charAt(char); }
	}
	if (hasComment) { returnCode += '</span>'; }
	returnCode += '</div><span class="clearer"></span>'
	return returnCode;
}
