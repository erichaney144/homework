import { BaseEntity } from 'entities/BaseEntity'

export class EntityManager {
	// TODO: implement proper persistance
	static instances: { [key: string]: { [key: number]: object } } = {}

	static all<T>(entityClass: typeof BaseEntity) {
		const entities = EntityManager.instances[entityClass.name]
		if (!entities) {
			return []
		}
		/** Technically sorting is not guaranteed, so let's sort them by id */
		const arr = Object.values(entities) as BaseEntity<T>[]
		return arr.sort((a, b) => (a.id && b.id ? a.id - b.id : 0))
	}

	static save<T extends BaseEntity<T>>(entity: T) {
		const entityClassName = entity.constructor.name
		if (!EntityManager.instances[entityClassName]) {
			EntityManager.instances[entityClassName] = {}
		}
		const entities = EntityManager.instances[entityClassName]
		if (!entity.id) {
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
			entity.id = maxId + 1
		}
		entities[entity.id] = entity
	}
}
