export class BaseEntity<T> {
	id?: number

	constructor(args: Partial<T> = {}) {
		Object.assign(this, args)
	}

	// TODO: implement proper persistance
	static instances: { [key: string]: { [key: number]: object } } = {}

	save() {
		const entityClassName = this.constructor.name
		if (!BaseEntity.instances[entityClassName]) {
			BaseEntity.instances[entityClassName] = {}
		}
		const entities = BaseEntity.instances[entityClassName]
		if (!this.id) {
			// New instance.
			// Assign an ID by getting the max id
			// from instances and add one.
			let maxId = 0
			Object.keys(entities)
				.map(Number)
				.forEach(id => {
					if (id > maxId) {
						maxId = id
					}
				})
			this.id = maxId + 1
		}
		entities[this.id] = this
	}
}
