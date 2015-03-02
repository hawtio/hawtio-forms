var Kubernetes;
(function (Kubernetes) {
    Kubernetes.schema = {
        "$schema": "http://json-schema.org/schema#",
        "additionalProperties": true,
        "definitions": {
            "docker_Config": {
                "additionalProperties": true,
                "javaType": "io.fabric8.docker.client.dockerclient.Config",
                "properties": {
                    "AttachStderr": {
                        "type": "boolean"
                    },
                    "AttachStdin": {
                        "type": "boolean"
                    },
                    "AttachStdout": {
                        "type": "boolean"
                    },
                    "Cmd": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "CpuSet": {
                        "type": "string"
                    },
                    "CpuShares": {
                        "type": "integer"
                    },
                    "Dns": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "Domainname": {
                        "type": "string"
                    },
                    "Entrypoint": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "Env": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "ExposedPorts": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,Object>",
                        "type": "object"
                    },
                    "Hostname": {
                        "type": "string"
                    },
                    "Image": {
                        "type": "string"
                    },
                    "Memory": {
                        "type": "integer"
                    },
                    "MemorySwap": {
                        "type": "integer"
                    },
                    "NetworkDisabled": {
                        "type": "boolean"
                    },
                    "OpenStdin": {
                        "type": "boolean"
                    },
                    "PortSpecs": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "StdinOnce": {
                        "type": "boolean"
                    },
                    "Tty": {
                        "type": "boolean"
                    },
                    "User": {
                        "type": "string"
                    },
                    "Volumes": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,Object>",
                        "type": "object"
                    },
                    "VolumesFrom": {
                        "type": "string"
                    },
                    "WorkingDir": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "docker_Image": {
                "additionalProperties": true,
                "javaType": "io.fabric8.docker.client.dockerclient.Image",
                "properties": {
                    "Architecture": {
                        "type": "string"
                    },
                    "Author": {
                        "type": "string"
                    },
                    "Comment": {
                        "type": "string"
                    },
                    "Config": {
                        "$ref": "#/definitions/docker_Config",
                        "javaType": "io.fabric8.docker.client.dockerclient.Config"
                    },
                    "Container": {
                        "type": "string"
                    },
                    "ContainerConfig": {
                        "$ref": "#/definitions/docker_Config",
                        "javaType": "io.fabric8.docker.client.dockerclient.Config"
                    },
                    "Created": {
                        "type": "string"
                    },
                    "DockerVersion": {
                        "type": "string"
                    },
                    "Id": {
                        "type": "string"
                    },
                    "Parent": {
                        "type": "string"
                    },
                    "Size": {
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_Container": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Container",
                "properties": {
                    "command": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "cpu": {
                        "$ref": "#/definitions/kubernetes_resource_Quantity",
                        "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
                    },
                    "env": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_EnvVar",
                            "javaType": "io.fabric8.kubernetes.api.model.base.EnvVar"
                        },
                        "type": "array"
                    },
                    "image": {
                        "type": "string"
                    },
                    "imagePullPolicy": {
                        "type": "string"
                    },
                    "lifecycle": {
                        "$ref": "#/definitions/kubernetes_base_Lifecycle",
                        "javaType": "io.fabric8.kubernetes.api.model.base.Lifecycle"
                    },
                    "livenessProbe": {
                        "$ref": "#/definitions/kubernetes_base_LivenessProbe",
                        "javaType": "io.fabric8.kubernetes.api.model.base.LivenessProbe"
                    },
                    "memory": {
                        "$ref": "#/definitions/kubernetes_resource_Quantity",
                        "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
                    },
                    "name": {
                        "type": "string"
                    },
                    "ports": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_Port",
                            "javaType": "io.fabric8.kubernetes.api.model.base.Port"
                        },
                        "type": "array"
                    },
                    "privileged": {
                        "type": "boolean"
                    },
                    "terminationMessagePath": {
                        "type": "string"
                    },
                    "volumeMounts": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_VolumeMount",
                            "javaType": "io.fabric8.kubernetes.api.model.base.VolumeMount"
                        },
                        "type": "array"
                    },
                    "workingDir": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_EmptyDir": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.EmptyDir",
                "type": "object"
            },
            "kubernetes_base_EnvVar": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.EnvVar",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_ExecAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.ExecAction",
                "properties": {
                    "command": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_GCEPersistentDisk": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.GCEPersistentDisk",
                "properties": {
                    "fsType": {
                        "type": "string"
                    },
                    "partition": {
                        "type": "integer"
                    },
                    "pdName": {
                        "type": "string"
                    },
                    "readOnly": {
                        "type": "boolean"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_GitRepo": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.GitRepo",
                "properties": {
                    "repository": {
                        "type": "string"
                    },
                    "revision": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_HTTPGetAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.HTTPGetAction",
                "properties": {
                    "host": {
                        "type": "string"
                    },
                    "path": {
                        "type": "string"
                    },
                    "port": {
                        "$ref": "#/definitions/kubernetes_util_IntOrString",
                        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_Handler": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Handler",
                "properties": {
                    "exec": {
                        "$ref": "#/definitions/kubernetes_base_ExecAction",
                        "javaType": "io.fabric8.kubernetes.api.model.base.ExecAction"
                    },
                    "httpGet": {
                        "$ref": "#/definitions/kubernetes_base_HTTPGetAction",
                        "javaType": "io.fabric8.kubernetes.api.model.base.HTTPGetAction"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_HostDir": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.HostDir",
                "properties": {
                    "path": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_Lifecycle": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Lifecycle",
                "properties": {
                    "postStart": {
                        "$ref": "#/definitions/kubernetes_base_Handler",
                        "javaType": "io.fabric8.kubernetes.api.model.base.Handler"
                    },
                    "preStop": {
                        "$ref": "#/definitions/kubernetes_base_Handler",
                        "javaType": "io.fabric8.kubernetes.api.model.base.Handler"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_ListMeta": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.ListMeta",
                "properties": {
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_LivenessProbe": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.LivenessProbe",
                "properties": {
                    "exec": {
                        "$ref": "#/definitions/kubernetes_base_ExecAction",
                        "javaType": "io.fabric8.kubernetes.api.model.base.ExecAction"
                    },
                    "httpGet": {
                        "$ref": "#/definitions/kubernetes_base_HTTPGetAction",
                        "javaType": "io.fabric8.kubernetes.api.model.base.HTTPGetAction"
                    },
                    "initialDelaySeconds": {
                        "type": "integer"
                    },
                    "tcpSocket": {
                        "$ref": "#/definitions/kubernetes_base_TCPSocketAction",
                        "javaType": "io.fabric8.kubernetes.api.model.base.TCPSocketAction"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_ObjectMeta": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.ObjectMeta",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_ObjectReference": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.ObjectReference",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "fieldPath": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_PodSpec": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.PodSpec",
                "properties": {
                    "containers": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_Container",
                            "javaType": "io.fabric8.kubernetes.api.model.base.Container"
                        },
                        "type": "array"
                    },
                    "dnsPolicy": {
                        "type": "string"
                    },
                    "host": {
                        "type": "string"
                    },
                    "nodeSelector": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "restartPolicy": {
                        "$ref": "#/definitions/kubernetes_base_RestartPolicy",
                        "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicy"
                    },
                    "volumes": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_Volume",
                            "javaType": "io.fabric8.kubernetes.api.model.base.Volume"
                        },
                        "type": "array"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_PodTemplateSpec": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.PodTemplateSpec",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "spec": {
                        "$ref": "#/definitions/kubernetes_base_PodSpec",
                        "javaType": "io.fabric8.kubernetes.api.model.base.PodSpec"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_Port": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Port",
                "properties": {
                    "containerPort": {
                        "type": "integer"
                    },
                    "hostIP": {
                        "type": "string"
                    },
                    "hostPort": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "protocol": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_ReplicationControllerSpec": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.ReplicationControllerSpec",
                "properties": {
                    "replicas": {
                        "type": "integer"
                    },
                    "selector": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "template": {
                        "$ref": "#/definitions/kubernetes_base_PodTemplateSpec",
                        "javaType": "io.fabric8.kubernetes.api.model.base.PodTemplateSpec"
                    },
                    "templateRef": {
                        "$ref": "#/definitions/kubernetes_base_ObjectReference",
                        "javaType": "io.fabric8.kubernetes.api.model.base.ObjectReference"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_RestartPolicy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicy",
                "properties": {
                    "always": {
                        "$ref": "#/definitions/kubernetes_base_RestartPolicyAlways",
                        "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyAlways"
                    },
                    "never": {
                        "$ref": "#/definitions/kubernetes_base_RestartPolicyNever",
                        "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyNever"
                    },
                    "onFailure": {
                        "$ref": "#/definitions/kubernetes_base_RestartPolicyOnFailure",
                        "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyOnFailure"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_RestartPolicyAlways": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyAlways",
                "type": "object"
            },
            "kubernetes_base_RestartPolicyNever": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyNever",
                "type": "object"
            },
            "kubernetes_base_RestartPolicyOnFailure": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.RestartPolicyOnFailure",
                "type": "object"
            },
            "kubernetes_base_Status": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Status",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "code": {
                        "type": "integer"
                    },
                    "details": {
                        "$ref": "#/definitions/kubernetes_base_StatusDetails",
                        "javaType": "io.fabric8.kubernetes.api.model.base.StatusDetails"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "reason": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_StatusCause": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.StatusCause",
                "properties": {
                    "field": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "reason": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_StatusDetails": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.StatusDetails",
                "properties": {
                    "causes": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_StatusCause",
                            "javaType": "io.fabric8.kubernetes.api.model.base.StatusCause"
                        },
                        "type": "array"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_TCPSocketAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.TCPSocketAction",
                "properties": {
                    "port": {
                        "$ref": "#/definitions/kubernetes_util_IntOrString",
                        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_TypeMeta": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.TypeMeta",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_Volume": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.Volume",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "source": {
                        "$ref": "#/definitions/kubernetes_base_VolumeSource",
                        "javaType": "io.fabric8.kubernetes.api.model.base.VolumeSource"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_VolumeMount": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.VolumeMount",
                "properties": {
                    "mountPath": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "readOnly": {
                        "type": "boolean"
                    }
                },
                "type": "object"
            },
            "kubernetes_base_VolumeSource": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.base.VolumeSource",
                "properties": {
                    "emptyDir": {
                        "$ref": "#/definitions/kubernetes_base_EmptyDir",
                        "javaType": "io.fabric8.kubernetes.api.model.base.EmptyDir"
                    },
                    "gitRepo": {
                        "$ref": "#/definitions/kubernetes_base_GitRepo",
                        "javaType": "io.fabric8.kubernetes.api.model.base.GitRepo"
                    },
                    "hostDir": {
                        "$ref": "#/definitions/kubernetes_base_HostDir",
                        "javaType": "io.fabric8.kubernetes.api.model.base.HostDir"
                    },
                    "persistentDisk": {
                        "$ref": "#/definitions/kubernetes_base_GCEPersistentDisk",
                        "javaType": "io.fabric8.kubernetes.api.model.base.GCEPersistentDisk"
                    }
                },
                "type": "object"
            },
            "kubernetes_errors_StatusError": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.errors.StatusError",
                "properties": {
                    "ErrStatus": {
                        "$ref": "#/definitions/kubernetes_base_Status",
                        "javaType": "io.fabric8.kubernetes.api.model.base.Status"
                    }
                },
                "type": "object"
            },
            "kubernetes_resource_Quantity": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity",
                "properties": {
                    "Amount": {
                        "$ref": "#/definitions/speter_inf_Dec",
                        "javaType": "io.fabric8.openshift.client.util.Dec"
                    },
                    "Format": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_runtime_RawExtension": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.runtime.RawExtension",
                "properties": {
                    "RawJSON": {
                        "items": {
                            "type": "integer"
                        },
                        "type": "array"
                    }
                },
                "type": "object"
            },
            "kubernetes_util_IntOrString": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString",
                "properties": {
                    "IntVal": {
                        "type": "integer"
                    },
                    "Kind": {
                        "type": "integer"
                    },
                    "StrVal": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Container": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Container",
                "properties": {
                    "command": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "cpu": {
                        "type": "integer"
                    },
                    "env": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_EnvVar",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EnvVar"
                        },
                        "type": "array"
                    },
                    "image": {
                        "type": "string"
                    },
                    "imagePullPolicy": {
                        "type": "string"
                    },
                    "lifecycle": {
                        "$ref": "#/definitions/kubernetes_v1beta2_Lifecycle",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Lifecycle"
                    },
                    "livenessProbe": {
                        "$ref": "#/definitions/kubernetes_v1beta2_LivenessProbe",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.LivenessProbe"
                    },
                    "memory": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "ports": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Port",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Port"
                        },
                        "type": "array"
                    },
                    "privileged": {
                        "type": "boolean"
                    },
                    "terminationMessagePath": {
                        "type": "string"
                    },
                    "volumeMounts": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_VolumeMount",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.VolumeMount"
                        },
                        "type": "array"
                    },
                    "workingDir": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerManifest": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerManifest",
                "properties": {
                    "containers": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Container",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Container"
                        },
                        "type": "array"
                    },
                    "dnsPolicy": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "restartPolicy": {
                        "$ref": "#/definitions/kubernetes_v1beta2_RestartPolicy",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicy"
                    },
                    "uuid": {
                        "type": "string"
                    },
                    "version": {
                        "type": "string"
                    },
                    "volumes": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Volume",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Volume"
                        },
                        "type": "array"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerState": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerState",
                "properties": {
                    "running": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ContainerStateRunning",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateRunning"
                    },
                    "termination": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ContainerStateTerminated",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateTerminated"
                    },
                    "waiting": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ContainerStateWaiting",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateWaiting"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerStateRunning": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateRunning",
                "properties": {
                    "startedAt": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerStateTerminated": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateTerminated",
                "properties": {
                    "exitCode": {
                        "type": "integer"
                    },
                    "finishedAt": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "reason": {
                        "type": "string"
                    },
                    "signal": {
                        "type": "integer"
                    },
                    "startedAt": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerStateWaiting": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStateWaiting",
                "properties": {
                    "reason": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ContainerStatus": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStatus",
                "properties": {
                    "containerID": {
                        "type": "string"
                    },
                    "image": {
                        "type": "string"
                    },
                    "podIP": {
                        "type": "string"
                    },
                    "restartCount": {
                        "type": "integer"
                    },
                    "state": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ContainerState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerState"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_EmptyDir": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EmptyDir",
                "type": "object"
            },
            "kubernetes_v1beta2_Endpoints": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Endpoints",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "endpoints": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_EndpointsList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EndpointsList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Endpoints",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Endpoints"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_EnvVar": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EnvVar",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ExecAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ExecAction",
                "properties": {
                    "command": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_GCEPersistentDisk": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.GCEPersistentDisk",
                "properties": {
                    "fsType": {
                        "type": "string"
                    },
                    "partition": {
                        "type": "integer"
                    },
                    "pdName": {
                        "type": "string"
                    },
                    "readOnly": {
                        "type": "boolean"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_GitRepo": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.GitRepo",
                "properties": {
                    "repository": {
                        "type": "string"
                    },
                    "revision": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_HTTPGetAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.HTTPGetAction",
                "properties": {
                    "host": {
                        "type": "string"
                    },
                    "path": {
                        "type": "string"
                    },
                    "port": {
                        "$ref": "#/definitions/kubernetes_util_IntOrString",
                        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Handler": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Handler",
                "properties": {
                    "exec": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ExecAction",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ExecAction"
                    },
                    "httpGet": {
                        "$ref": "#/definitions/kubernetes_v1beta2_HTTPGetAction",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.HTTPGetAction"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_HostDir": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.HostDir",
                "properties": {
                    "path": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Lifecycle": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Lifecycle",
                "properties": {
                    "postStart": {
                        "$ref": "#/definitions/kubernetes_v1beta2_Handler",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Handler"
                    },
                    "preStop": {
                        "$ref": "#/definitions/kubernetes_v1beta2_Handler",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Handler"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_List": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.KubernetesList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_runtime_RawExtension",
                            "javaType": "io.fabric8.kubernetes.api.model.runtime.RawExtension"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_LivenessProbe": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.LivenessProbe",
                "properties": {
                    "exec": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ExecAction",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ExecAction"
                    },
                    "httpGet": {
                        "$ref": "#/definitions/kubernetes_v1beta2_HTTPGetAction",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.HTTPGetAction"
                    },
                    "initialDelaySeconds": {
                        "type": "integer"
                    },
                    "tcpSocket": {
                        "$ref": "#/definitions/kubernetes_v1beta2_TCPSocketAction",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.TCPSocketAction"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Minion": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Minion",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "hostIP": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "resources": {
                        "$ref": "#/definitions/kubernetes_v1beta2_NodeResources",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeResources"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "status": {
                        "$ref": "#/definitions/kubernetes_v1beta2_NodeStatus",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeStatus"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_MinionList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.MinionList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Minion",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Minion"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_NodeCondition": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeCondition",
                "properties": {
                    "kind": {
                        "type": "string"
                    },
                    "lastTransitionTime": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    },
                    "reason": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_NodeResources": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeResources",
                "properties": {
                    "capacity": {
                        "additionalProperties": {
                            "$ref": "#/definitions/kubernetes_util_IntOrString",
                            "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                        },
                        "javaType": "java.util.Map<String,io.fabric8.kubernetes.api.model.util.IntOrString>",
                        "type": "object"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_NodeStatus": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeStatus",
                "properties": {
                    "conditions": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_NodeCondition",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.NodeCondition"
                        },
                        "type": "array"
                    },
                    "phase": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Pod": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Pod",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "currentState": {
                        "$ref": "#/definitions/kubernetes_v1beta2_PodState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodState"
                    },
                    "desiredState": {
                        "$ref": "#/definitions/kubernetes_v1beta2_PodState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodState"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "nodeSelector": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_PodList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Pod",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Pod"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_PodState": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodState",
                "properties": {
                    "host": {
                        "type": "string"
                    },
                    "hostIP": {
                        "type": "string"
                    },
                    "info": {
                        "additionalProperties": {
                            "$ref": "#/definitions/kubernetes_v1beta2_ContainerStatus",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStatus"
                        },
                        "javaType": "java.util.Map<String,io.fabric8.kubernetes.api.model.v1beta2.ContainerStatus>",
                        "type": "object"
                    },
                    "manifest": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ContainerManifest",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerManifest"
                    },
                    "message": {
                        "type": "string"
                    },
                    "podIP": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_PodTemplate": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodTemplate",
                "properties": {
                    "desiredState": {
                        "$ref": "#/definitions/kubernetes_v1beta2_PodState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodState"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Port": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Port",
                "properties": {
                    "containerPort": {
                        "type": "integer"
                    },
                    "hostIP": {
                        "type": "string"
                    },
                    "hostPort": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "protocol": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ReplicationController": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationController",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "currentState": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ReplicationControllerState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationControllerState"
                    },
                    "desiredState": {
                        "$ref": "#/definitions/kubernetes_v1beta2_ReplicationControllerState",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationControllerState"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ReplicationControllerList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationControllerList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_ReplicationController",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationController"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ReplicationControllerState": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationControllerState",
                "properties": {
                    "podTemplate": {
                        "$ref": "#/definitions/kubernetes_v1beta2_PodTemplate",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodTemplate"
                    },
                    "replicaSelector": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "replicas": {
                        "type": "integer"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_RestartPolicy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicy",
                "properties": {
                    "always": {
                        "$ref": "#/definitions/kubernetes_v1beta2_RestartPolicyAlways",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyAlways"
                    },
                    "never": {
                        "$ref": "#/definitions/kubernetes_v1beta2_RestartPolicyNever",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyNever"
                    },
                    "onFailure": {
                        "$ref": "#/definitions/kubernetes_v1beta2_RestartPolicyOnFailure",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyOnFailure"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_RestartPolicyAlways": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyAlways",
                "type": "object"
            },
            "kubernetes_v1beta2_RestartPolicyNever": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyNever",
                "type": "object"
            },
            "kubernetes_v1beta2_RestartPolicyOnFailure": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.RestartPolicyOnFailure",
                "type": "object"
            },
            "kubernetes_v1beta2_Service": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Service",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "containerPort": {
                        "$ref": "#/definitions/kubernetes_util_IntOrString",
                        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                    },
                    "createExternalLoadBalancer": {
                        "type": "boolean"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "port": {
                        "type": "integer"
                    },
                    "portalIP": {
                        "type": "string"
                    },
                    "protocol": {
                        "type": "string"
                    },
                    "proxyPort": {
                        "type": "integer"
                    },
                    "publicIPs": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selector": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "sessionAffinity": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_ServiceList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ServiceList",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_v1beta2_Service",
                            "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Service"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_TCPSocketAction": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.TCPSocketAction",
                "properties": {
                    "port": {
                        "$ref": "#/definitions/kubernetes_util_IntOrString",
                        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_TypeMeta": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.TypeMeta",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "id": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "integer"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_Volume": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Volume",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "source": {
                        "$ref": "#/definitions/kubernetes_v1beta2_VolumeSource",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.VolumeSource"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_VolumeMount": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.VolumeMount",
                "properties": {
                    "mountPath": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "readOnly": {
                        "type": "boolean"
                    }
                },
                "type": "object"
            },
            "kubernetes_v1beta2_VolumeSource": {
                "additionalProperties": true,
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.VolumeSource",
                "properties": {
                    "emptyDir": {
                        "$ref": "#/definitions/kubernetes_v1beta2_EmptyDir",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EmptyDir"
                    },
                    "gitRepo": {
                        "$ref": "#/definitions/kubernetes_v1beta2_GitRepo",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.GitRepo"
                    },
                    "hostDir": {
                        "$ref": "#/definitions/kubernetes_v1beta2_HostDir",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.HostDir"
                    },
                    "persistentDisk": {
                        "$ref": "#/definitions/kubernetes_v1beta2_GCEPersistentDisk",
                        "javaType": "io.fabric8.kubernetes.api.model.v1beta2.GCEPersistentDisk"
                    }
                },
                "type": "object"
            },
            "os_build_Build": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.Build",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "cancelled": {
                        "type": "boolean"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "parameters": {
                        "$ref": "#/definitions/os_build_BuildParameters",
                        "javaType": "io.fabric8.openshift.api.model.build.BuildParameters"
                    },
                    "podName": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildConfig": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildConfig",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "parameters": {
                        "$ref": "#/definitions/os_build_BuildParameters",
                        "javaType": "io.fabric8.openshift.api.model.build.BuildParameters"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "triggers": {
                        "items": {
                            "$ref": "#/definitions/os_build_BuildTriggerPolicy",
                            "javaType": "io.fabric8.openshift.api.model.build.BuildTriggerPolicy"
                        },
                        "type": "array"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildConfigList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildConfigList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_build_BuildConfig",
                            "javaType": "io.fabric8.openshift.api.model.build.BuildConfig"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_build_Build",
                            "javaType": "io.fabric8.openshift.api.model.build.Build"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildOutput": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildOutput",
                "properties": {
                    "imageTag": {
                        "type": "string"
                    },
                    "registry": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildParameters": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildParameters",
                "properties": {
                    "output": {
                        "$ref": "#/definitions/os_build_BuildOutput",
                        "javaType": "io.fabric8.openshift.api.model.build.BuildOutput"
                    },
                    "revision": {
                        "$ref": "#/definitions/os_build_SourceRevision",
                        "javaType": "io.fabric8.openshift.api.model.build.SourceRevision"
                    },
                    "source": {
                        "$ref": "#/definitions/os_build_BuildSource",
                        "javaType": "io.fabric8.openshift.api.model.build.BuildSource"
                    },
                    "strategy": {
                        "$ref": "#/definitions/os_build_BuildStrategy",
                        "javaType": "io.fabric8.openshift.api.model.build.BuildStrategy"
                    }
                },
                "type": "object"
            },
            "os_build_BuildSource": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildSource",
                "properties": {
                    "git": {
                        "$ref": "#/definitions/os_build_GitBuildSource",
                        "javaType": "io.fabric8.openshift.api.model.build.GitBuildSource"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildStrategy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildStrategy",
                "properties": {
                    "customStrategy": {
                        "$ref": "#/definitions/os_build_CustomBuildStrategy",
                        "javaType": "io.fabric8.openshift.api.model.build.CustomBuildStrategy"
                    },
                    "dockerStrategy": {
                        "$ref": "#/definitions/os_build_DockerBuildStrategy",
                        "javaType": "io.fabric8.openshift.api.model.build.DockerBuildStrategy"
                    },
                    "stiStrategy": {
                        "$ref": "#/definitions/os_build_STIBuildStrategy",
                        "javaType": "io.fabric8.openshift.api.model.build.STIBuildStrategy"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_BuildTriggerPolicy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.BuildTriggerPolicy",
                "properties": {
                    "generic": {
                        "$ref": "#/definitions/os_build_WebHookTrigger",
                        "javaType": "io.fabric8.openshift.api.model.build.WebHookTrigger"
                    },
                    "github": {
                        "$ref": "#/definitions/os_build_WebHookTrigger",
                        "javaType": "io.fabric8.openshift.api.model.build.WebHookTrigger"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_CustomBuildStrategy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.CustomBuildStrategy",
                "properties": {
                    "env": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_EnvVar",
                            "javaType": "io.fabric8.kubernetes.api.model.base.EnvVar"
                        },
                        "type": "array"
                    },
                    "exposeDockerSocket": {
                        "type": "boolean"
                    },
                    "image": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_DockerBuildStrategy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.DockerBuildStrategy",
                "properties": {
                    "contextDir": {
                        "type": "string"
                    },
                    "noCache": {
                        "type": "boolean"
                    }
                },
                "type": "object"
            },
            "os_build_GitBuildSource": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.GitBuildSource",
                "properties": {
                    "ref": {
                        "type": "string"
                    },
                    "uri": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_GitSourceRevision": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.GitSourceRevision",
                "properties": {
                    "author": {
                        "$ref": "#/definitions/os_build_SourceControlUser",
                        "javaType": "io.fabric8.openshift.api.model.build.SourceControlUser"
                    },
                    "commit": {
                        "type": "string"
                    },
                    "committer": {
                        "$ref": "#/definitions/os_build_SourceControlUser",
                        "javaType": "io.fabric8.openshift.api.model.build.SourceControlUser"
                    },
                    "message": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_STIBuildStrategy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.STIBuildStrategy",
                "properties": {
                    "clean": {
                        "type": "boolean"
                    },
                    "image": {
                        "type": "string"
                    },
                    "scripts": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_SourceControlUser": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.SourceControlUser",
                "properties": {
                    "email": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_SourceRevision": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.SourceRevision",
                "properties": {
                    "git": {
                        "$ref": "#/definitions/os_build_GitSourceRevision",
                        "javaType": "io.fabric8.openshift.api.model.build.GitSourceRevision"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_build_WebHookTrigger": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.build.WebHookTrigger",
                "properties": {
                    "secret": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_config_Config": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.config.Config",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {},
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_CustomDeploymentStrategyParams": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.CustomDeploymentStrategyParams",
                "properties": {
                    "command": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "environment": {
                        "items": {
                            "$ref": "#/definitions/kubernetes_base_EnvVar",
                            "javaType": "io.fabric8.kubernetes.api.model.base.EnvVar"
                        },
                        "type": "array"
                    },
                    "image": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_Deployment": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.Deployment",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "controllerTemplate": {
                        "$ref": "#/definitions/kubernetes_base_ReplicationControllerSpec",
                        "javaType": "io.fabric8.kubernetes.api.model.base.ReplicationControllerSpec"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "details": {
                        "$ref": "#/definitions/os_deploy_DeploymentDetails",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentDetails"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "status": {
                        "type": "string"
                    },
                    "strategy": {
                        "$ref": "#/definitions/os_deploy_DeploymentStrategy",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentStrategy"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentCause": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentCause",
                "properties": {
                    "imageTrigger": {
                        "$ref": "#/definitions/os_deploy_DeploymentCauseImageTrigger",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentCauseImageTrigger"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentCauseImageTrigger": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentCauseImageTrigger",
                "properties": {
                    "repositoryName": {
                        "type": "string"
                    },
                    "tag": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentConfig": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentConfig",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "details": {
                        "$ref": "#/definitions/os_deploy_DeploymentDetails",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentDetails"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "latestVersion": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "template": {
                        "$ref": "#/definitions/os_deploy_DeploymentTemplate",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTemplate"
                    },
                    "triggers": {
                        "items": {
                            "$ref": "#/definitions/os_deploy_DeploymentTriggerPolicy",
                            "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTriggerPolicy"
                        },
                        "type": "array"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentConfigList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentConfigList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_deploy_DeploymentConfig",
                            "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentConfig"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentDetails": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentDetails",
                "properties": {
                    "causes": {
                        "items": {
                            "$ref": "#/definitions/os_deploy_DeploymentCause",
                            "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentCause"
                        },
                        "type": "array"
                    },
                    "message": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_deploy_Deployment",
                            "javaType": "io.fabric8.openshift.api.model.deploy.Deployment"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentStrategy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentStrategy",
                "properties": {
                    "customParams": {
                        "$ref": "#/definitions/os_deploy_CustomDeploymentStrategyParams",
                        "javaType": "io.fabric8.openshift.api.model.deploy.CustomDeploymentStrategyParams"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentTemplate": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTemplate",
                "properties": {
                    "controllerTemplate": {
                        "$ref": "#/definitions/kubernetes_base_ReplicationControllerSpec",
                        "javaType": "io.fabric8.kubernetes.api.model.base.ReplicationControllerSpec"
                    },
                    "strategy": {
                        "$ref": "#/definitions/os_deploy_DeploymentStrategy",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentStrategy"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentTriggerImageChangeParams": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTriggerImageChangeParams",
                "properties": {
                    "automatic": {
                        "type": "boolean"
                    },
                    "containerNames": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "repositoryName": {
                        "type": "string"
                    },
                    "tag": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_deploy_DeploymentTriggerPolicy": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTriggerPolicy",
                "properties": {
                    "imageChangeParams": {
                        "$ref": "#/definitions/os_deploy_DeploymentTriggerImageChangeParams",
                        "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentTriggerImageChangeParams"
                    },
                    "type": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_image_Image": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.image.Image",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "dockerImageMetadata": {
                        "$ref": "#/definitions/docker_Image",
                        "javaType": "io.fabric8.docker.client.dockerclient.Image"
                    },
                    "dockerImageReference": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_image_ImageList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.image.ImageList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_image_Image",
                            "javaType": "io.fabric8.openshift.api.model.image.Image"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_image_ImageRepository": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.image.ImageRepository",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "dockerImageRepository": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "status": {
                        "$ref": "#/definitions/os_image_ImageRepositoryStatus",
                        "javaType": "io.fabric8.openshift.api.model.image.ImageRepositoryStatus"
                    },
                    "tags": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_image_ImageRepositoryList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.image.ImageRepositoryList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_image_ImageRepository",
                            "javaType": "io.fabric8.openshift.api.model.image.ImageRepository"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_image_ImageRepositoryStatus": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.image.ImageRepositoryStatus",
                "properties": {
                    "dockerImageRepository": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_route_Route": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.route.Route",
                "properties": {
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "host": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "path": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "serviceName": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_route_RouteList": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.route.RouteList",
                "properties": {
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "items": {
                        "items": {
                            "$ref": "#/definitions/os_route_Route",
                            "javaType": "io.fabric8.openshift.api.model.route.Route"
                        },
                        "type": "array"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_template_Parameter": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.template.Parameter",
                "properties": {
                    "Description": {
                        "type": "string"
                    },
                    "From": {
                        "type": "string"
                    },
                    "Generate": {
                        "type": "string"
                    },
                    "Name": {
                        "type": "string"
                    },
                    "Value": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "os_template_Template": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.api.model.template.Template",
                "properties": {
                    "ObjectLabels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "Objects": {
                        "items": {},
                        "type": "array"
                    },
                    "Parameters": {
                        "items": {
                            "$ref": "#/definitions/os_template_Parameter",
                            "javaType": "io.fabric8.openshift.api.model.template.Parameter"
                        },
                        "type": "array"
                    },
                    "annotations": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "apiVersion": {
                        "default": "v1beta2",
                        "type": "string"
                    },
                    "creationTimestamp": {
                        "type": "string"
                    },
                    "kind": {
                        "type": "string"
                    },
                    "labels": {
                        "additionalProperties": {
                            "type": "string"
                        },
                        "javaType": "java.util.Map<String,String>",
                        "type": "object"
                    },
                    "name": {
                        "type": "string"
                    },
                    "namespace": {
                        "type": "string"
                    },
                    "resourceVersion": {
                        "type": "string"
                    },
                    "selfLink": {
                        "type": "string"
                    },
                    "uid": {
                        "type": "string"
                    }
                },
                "type": "object"
            },
            "speter_inf_Dec": {
                "additionalProperties": true,
                "javaType": "io.fabric8.openshift.client.util.Dec",
                "type": "object"
            }
        },
        "id": "http://fabric8.io/fabric8/v2/Schema#",
        "properties": {
            "BuildConfigList": {
                "$ref": "#/definitions/os_build_BuildConfigList",
                "javaType": "io.fabric8.openshift.api.model.build.BuildConfigList"
            },
            "BuildList": {
                "$ref": "#/definitions/os_build_BuildList",
                "javaType": "io.fabric8.openshift.api.model.build.BuildList"
            },
            "Config": {
                "$ref": "#/definitions/os_config_Config",
                "javaType": "io.fabric8.openshift.api.model.config.Config"
            },
            "ContainerStatus": {
                "$ref": "#/definitions/kubernetes_v1beta2_ContainerStatus",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ContainerStatus"
            },
            "DeploymentConfigList": {
                "$ref": "#/definitions/os_deploy_DeploymentConfigList",
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentConfigList"
            },
            "DeploymentList": {
                "$ref": "#/definitions/os_deploy_DeploymentList",
                "javaType": "io.fabric8.openshift.api.model.deploy.DeploymentList"
            },
            "Endpoints": {
                "$ref": "#/definitions/kubernetes_v1beta2_Endpoints",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Endpoints"
            },
            "EndpointsList": {
                "$ref": "#/definitions/kubernetes_v1beta2_EndpointsList",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EndpointsList"
            },
            "EnvVar": {
                "$ref": "#/definitions/kubernetes_v1beta2_EnvVar",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.EnvVar"
            },
            "ImageList": {
                "$ref": "#/definitions/os_image_ImageList",
                "javaType": "io.fabric8.openshift.api.model.image.ImageList"
            },
            "ImageRepositoryList": {
                "$ref": "#/definitions/os_image_ImageRepositoryList",
                "javaType": "io.fabric8.openshift.api.model.image.ImageRepositoryList"
            },
            "KubernetesList": {
                "$ref": "#/definitions/kubernetes_v1beta2_List",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.KubernetesList"
            },
            "Minion": {
                "$ref": "#/definitions/kubernetes_v1beta2_Minion",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.Minion"
            },
            "MinionList": {
                "$ref": "#/definitions/kubernetes_v1beta2_MinionList",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.MinionList"
            },
            "PodList": {
                "$ref": "#/definitions/kubernetes_v1beta2_PodList",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.PodList"
            },
            "ReplicationControllerList": {
                "$ref": "#/definitions/kubernetes_v1beta2_ReplicationControllerList",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ReplicationControllerList"
            },
            "RouteList": {
                "$ref": "#/definitions/os_route_RouteList",
                "javaType": "io.fabric8.openshift.api.model.route.RouteList"
            },
            "ServiceList": {
                "$ref": "#/definitions/kubernetes_v1beta2_ServiceList",
                "javaType": "io.fabric8.kubernetes.api.model.v1beta2.ServiceList"
            },
            "StatusError": {
                "$ref": "#/definitions/kubernetes_errors_StatusError",
                "javaType": "io.fabric8.kubernetes.api.model.errors.StatusError"
            },
            "Template": {
                "$ref": "#/definitions/os_template_Template",
                "javaType": "io.fabric8.openshift.api.model.template.Template"
            }
        },
        "type": "object"
    };
})(Kubernetes || (Kubernetes = {}));
