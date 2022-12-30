export class BaseEntity<T> {
	id?: number

	// TODO: Not great typing here.
	// TODO: Expect proper persistence framework will have a better way.
	constructor(args: Partial<T> = {}) {
		Object.assign(this, args)
	}
}
