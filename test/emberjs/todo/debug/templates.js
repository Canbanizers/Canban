this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["todos"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("All");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Active");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("Completed");
  }

function program7(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n					<button id=\"clear-completed\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "clearCompleted", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">\r\n						Clear completed (");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "completed", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(")\r\n					</button>\r\n				");
  return buffer;
  }

  data.buffer.push("<section id=\"todoapp\">\r\n			<header id=\"header\">\r\n				<h1>todos</h1>\r\n				");
  hashContexts = {'type': depth0,'id': depth0,'placeholder': depth0,'value': depth0,'action': depth0};
  hashTypes = {'type': "STRING",'id': "STRING",'placeholder': "STRING",'value': "ID",'action': "STRING"};
  options = {hash:{
    'type': ("text"),
    'id': ("new-todo"),
    'placeholder': ("What needs to be done?"),
    'value': ("newTitle"),
    'action': ("createTodo")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n			</header>\r\n\r\n			<section id=\"main\">\r\n				");
  hashContexts = {'type': depth0,'id': depth0,'checked': depth0};
  hashTypes = {'type': "STRING",'id': "STRING",'checked': "ID"};
  options = {hash:{
    'type': ("checkbox"),
    'id': ("toggle-all"),
    'checked': ("allAreDone")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n				");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n			</section>\r\n\r\n			<footer id=\"footer\">\r\n				<span id=\"todo-count\">\r\n				  	<strong>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "remaining", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</strong> ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "inflection", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" left\r\n				</span>\r\n				<ul id=\"filters\">\r\n				  <li>\r\n					  ");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "todos.index", options) : helperMissing.call(depth0, "link-to", "todos.index", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				  </li>\r\n				  <li>\r\n					");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "todos.active", options) : helperMissing.call(depth0, "link-to", "todos.active", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				  </li>\r\n				  <li>\r\n  					");
  hashContexts = {'activeClass': depth0};
  hashTypes = {'activeClass': "STRING"};
  options = {hash:{
    'activeClass': ("selected")
  },inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "todos.completed", options) : helperMissing.call(depth0, "link-to", "todos.completed", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				  </li>\r\n				</ul>\r\n\r\n				");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "hasCompleted", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n			</footer>\r\n		</section>\r\n\r\n		<footer id=\"info\">\r\n		  <p>Double-click to edit a todo</p>\r\n		</footer>");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["todos/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n				<li ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("isCompleted:completed isEditing:editing")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">\r\n				  	");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers['if'].call(depth0, "isEditing", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n				</li>\r\n		  	");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n						");
  hashContexts = {'class': depth0,'value': depth0,'focus-out': depth0,'insert-newline': depth0};
  hashTypes = {'class': "STRING",'value': "ID",'focus-out': "STRING",'insert-newline': "STRING"};
  options = {hash:{
    'class': ("edit"),
    'value': ("title"),
    'focus-out': ("acceptChanges"),
    'insert-newline': ("acceptChanges")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['edit-todo'] || depth0['edit-todo']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "edit-todo", options))));
  data.buffer.push("\r\n				  	");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n						");
  hashContexts = {'type': depth0,'checked': depth0,'class': depth0};
  hashTypes = {'type': "STRING",'checked': "ID",'class': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'checked': ("isCompleted"),
    'class': ("toggle")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n						<label ");
  hashContexts = {'on': depth0};
  hashTypes = {'on': "STRING"};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editTodo", {hash:{
    'on': ("doubleClick")
  },contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "title", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</label><button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeTodo", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" class=\"destroy\"></button>\r\n				  	");
  return buffer;
  }

  data.buffer.push("		<ul id=\"todo-list\">\r\n		  	");
  hashContexts = {'itemController': depth0};
  hashTypes = {'itemController': "STRING"};
  stack1 = helpers.each.call(depth0, {hash:{
    'itemController': ("todo")
  },inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n		</ul>");
  return buffer;
  
});