const tcsProjectId = "14600";
const tcsIssueTypeId = '14';
const tcsApiEpicLink = 'TCS-10';
const pathTypes = ['happy_path', 'error_path'];

// Input
let endpoint = '/v1/user/password/reset_by_employee';
let endpointName = endpoint.split('/').pop();

let gitHubRouteLine = 'https://github.com/angieslist/security/blob/CORE-647-change-user-password/modules/security/conf/routes#L15';
let gitHubRequestName = 'ResetPasswordByEmployeeRequest';
let gitHubRequestLines = 'https://github.com/angieslist/security/blob/CORE-647-change-user-password/modules/messages/src/main/scala/com/angieslist/security/messages/version1/PasswordServicesMessages.scala#L20-L22';
let gitHubResponseName = 'ResetPasswordByEmployeeResponse';
let gitHubResponseLines = 'https://github.com/angieslist/security/blob/CORE-647-change-user-password/modules/messages/src/main/scala/com/angieslist/security/messages/version1/PasswordServicesMessages.scala#L23';
let asignee = 'jason.smith';
let validMethods = ['POST'];
let invalidMethods = ['GET', 'DELETE', 'OPTIONS', 'PUT'];
let appBC = 'Security';

let methods = {
	valid: ['POST'],
	invalid: ['GET', 'DELETE', 'OPTIONS', 'PUT']
};

// Selection
let application = 'security_bc_tp';

// Dropdowns
let custFieldExecutionStatusTAT = 'Not Executed'; 	// customfield_13000
let custFieldExecutionStatusQA = 'Passed'; 			// customfield_13202
let custFieldProductReviewed = 'No';				// customfield_13300				
let custFieldAutomationComplete = 'Yes';			// customfield_13004
let custFieldRegression = 'No';						// customfield_13003
let custFieldAppWebsite = 'ServiceTown';			// customfield_13001
let custFieldFunctionalArea = 'My Account';			// customfield_13002
let custFieldProject = 'Tampa APIs';				// customfield_13203

const updateObj = {
    'update': {},
    'fields': {
        'project': {
            'id': tcsProjectId
        },
        'summary': '',
        'issuetype': {
            'id': tcsIssueTypeId
        },
        'assignee': {
            'name': asignee
        },
        'reporter': {
            'name': asignee
        },
        'labels': [],
        'description': '',
        'fixVersions': [],
        'customfield_13203': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/13904',
	      'value': custFieldProject,
	      'id': '13904'
	    },
	    'customfield_13202': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12503',
	      'value': custFieldExecutionStatusQA,
	      'id': '12503'
	    },
	    'customfield_13300': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12601',
	      'value': custFieldProductReviewed,
	      'id': '12601'
	    },
	    'customfield_13001': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12209',
	      'value': custFieldAppWebsite,
	      'id': '12209'
	    },
	    'customfield_13000': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12200',
	      'value': custFieldExecutionStatusTAT,
	      'id': '12200'
	    },
	    'customfield_13003': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12221',
	      'value': custFieldRegression,
	      'id': '12221'
	    },
	    'customfield_13002': [
	      {
	        'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12217',
	        'value': custFieldFunctionalArea,
	        'id': '12217'
	      }
	    ],
	    'customfield_13004': {
	      'self': 'https://angieslist.atlassian.net/rest/api/2/customFieldOption/12223',
	      'value': custFieldAutomationComplete,
	      'id': '12223'
	    },
	    'customfield_10008': tcsApiEpicLink
    }
};

function addPathMethod() {
	let methodList = [];

	methods.valid.map((method => {
		const summary = 'Send a ' + method.toUpperCase() + ' to ' + endpoint;
		const description = '|| || Assumptions || || ||\r\n' + 
			'| 1 | X-ANGI-ProxyVersion Request Header is set with a value of 1 |  |  |\r\n' +
			'|| || Step || Expected Results || Notes ||\r\n' + 
			'| 1 | Send a ' + method.toUpperCase() + ' to the ' + appBC + ' BC ' + endpoint + ' route. | A status code of 200, and response object is returned |' + 
			'[' + gitHubRequestName + ' |' + gitHubRequestLines + '] ' + 
			'[' + gitHubResponseName + ' |' + gitHubResponseLines + '] ';

		const newObj = Object.assign({}, updateObj, {fields: Object.assign({}, updateObj.fields, {labels: ['happy_path', application]}, {summary: summary}, {description: description})});
		methodList.push(newObj);
	}))

	methods.invalid.map((method => {
		const summary = 'Send a ' + method.toUpperCase() + ' to ' + endpoint;
		const description = '|| || Assumptions || || || \r\n' + 
			'|| || Step || Expected Results || Notes || \r\n' + 
			'| 1 | Send a ' + method.toUpperCase() + ' to the ' + appBC + ' BC ' + endpoint + ' route. | A status code of 404 is returned, and an HTML page entitled \'Action not found\' is returned ' + 
			'| [' + endpointName + ' route | ' + gitHubRouteLine + '] |';

		const newObj = Object.assign({}, updateObj, {fields: Object.assign({}, updateObj.fields, {labels: ['error_path', application]}, {summary: summary}, {description: description})});
		methodList.push(newObj);
	}))

	const bulkUpdate = {
		issueUpdates: methodList
	};
	console.log(JSON.stringify(bulkUpdate));
	return bulkUpdate;
}
