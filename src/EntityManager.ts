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
		let entityClassName = this.getChildOfBaseEntityName(entity)
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

	static getChildOfBaseEntityName(entity: any) {
		// Go up until just before BaseEntity
		let prototype = Object.getPrototypeOf(entity)
		while (
			prototype &&
			entity instanceof BaseEntity &&
			Object.getPrototypeOf(prototype).constructor.name != BaseEntity.name
		) {
			prototype = Object.getPrototypeOf(prototype)
		}
		return prototype.constructor.name
	}

	static find<T extends BaseEntity<T>>(
		klass: { prototype: T },
		filters: Partial<{ [key in keyof T]: string | number }>
	): T[] {
		// not correct typing
		const entities = EntityManager.all(klass as unknown as typeof BaseEntity)
		return entities.filter(e => {
			return Object.entries(filters).reduce((allMatch, [k, v]) => {
				return allMatch && (e as any)[k] === v
			}, true)
		}) as T[]
	}

	static findOne<T extends BaseEntity<T>>(
		klass: { prototype: T },
		filters: Partial<{ [key in keyof T]: string | number }>
	): T | null {
		const matches = EntityManager.find(klass, filters)
		return matches && matches.length ? matches[0] : null
	}
}
