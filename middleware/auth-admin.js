export default async function (context) {
	let user = context.$auth.user;
	console.log(context.route.query)
	if (user && user.admin) {
		// you can proceed
	} else {
		context.redirect('/401')
	}
}