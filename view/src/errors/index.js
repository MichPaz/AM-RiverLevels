class ErrorHandling {
    constructor(model) {
        this.model = model
    }


    isToRestore(error) {
        return Boolean((error?.validatorKey === 'not_unique') && Boolean(error?.object))
    }

    getMessage(error) {
        if (error?.validatorKey === "association_violation") {
            const label = this.model.find(e => e?.key === error.path)?.label
            return `Operação inválida: possui associação com ${label}`
        }

        if (error?.validatorKey === 'not_unique') {
            const label = this.model.find(e => e?.key === error.path)?.label
            return `O campo ${label} com o valor '${error.value}' já está cadastrado!`
        }
        return undefined
    }
}

export default ErrorHandling