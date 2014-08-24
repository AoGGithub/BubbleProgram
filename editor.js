var codeId = 0;
var bubbleId = 0;

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

getCodeId(var increment)
{
	var oldCodeId = codeId;
	if (increment == true)
	{
		codeId++;
	}
	return 'code' + oldCodeId;
}

function getCodeEditor(id)
{
	return '<span class="code_node" id="' + id + '"><span class="code_edit_node" onclick="edit(' + id + ');">';
}

function graphicParse(code, generateDivs)
{
	var hasComment = false;
	var returnCode = '<div class="code">' + getCodeEditor(getCodeId(true));
	for (var char = 0; char < code.length; char++)
	{
		if ((code.charAt(char) == "(") || (code.charAt(char) == ")"))
		{
			if (code.charAt(char) == "(") 
			{
				returnCode += "</span></span>";
				if (hasComment)
				{
					returnCode += '<span class="commentbubble">' + getCodeEditor(getCodeId(true));
				}
				else
				{
					returnCode += '<span class="bubble" id="bubble' + bubbleId + '" onhover="popbubblemenu(' + bubbleId + ');">' + getCodeEditor

(getCodeId(true));
					bubbleId++;
				}

			}
			else { returnCode += '</span></span></span>' + getCodeEditor(getCodeId(true)); }		
		}
		else if (code.charAt(char) == "<")
		{
			if ((code.charAt(char + 1) == "-") && (code.charAt(char + 2) == "-"))
			{
				if (hasComment) { returnCode += '<img src="commentArrow.png">'; }
				else { returnCode += '</span></span><span class="comment"><img src="commentArrow.png">' + getCodeEditor(getCodeId(true)); }
				char += 2;
				hasComment = true;
			}
			else { returnCode += code.charAt(char); }
		}
		else { returnCode += code.charAt(char); }
	}
	if (hasComment) { returnCode += '</span>'; }
	returnCode += '</span></span></div><span class="clearer"></span>'
	return returnCode;
}

function popbubblemenu(id)
{
	
}

function edit(id)
{
	tag = document.getElementById(id);
	oldText = tag.childNodes[0].innerHTML;
	tag.innerHTML = '<input type="text" value="' + oldText + '" id="edit' + id + '"/><button onclick="finishedit(' + id + ');">Finish</button>';
}

function finishedit(id)
{
	tag = document.getElementById(id);
	newText = document.getElementById("edit" + id).value;
	tag.innerHTML = '<span class=""code_edit_node onclick="edit(' + id + ');">' + newText + '</span>';
}
